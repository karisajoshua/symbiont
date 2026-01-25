import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Kenya Counties for mapping
const KENYA_COUNTIES = [
  "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Uasin Gishu", "Kiambu",
  "Machakos", "Kajiado", "Meru", "Nyeri", "Kilifi", "Garissa",
  "Kakamega", "Bungoma", "Trans Nzoia", "Nandi", "Kericho", "Bomet",
  "Nyamira", "Kisii", "Migori", "Homa Bay", "Siaya", "Busia",
  "Vihiga", "Turkana", "West Pokot", "Samburu", "Baringo", "Elgeyo Marakwet",
  "Laikipia", "Nyandarua", "Murang'a", "Kirinyaga", "Embu", "Tharaka Nithi",
  "Isiolo", "Marsabit", "Wajir", "Mandera", "Tana River", "Lamu",
  "Taita Taveta", "Kwale", "Makueni", "Kitui", "Narok"
];

// Simulated social media posts for demo
const MOCK_POSTS = [
  { platform: "X", text: "Traffic in Westlands is totally gridlocked today! #NairobiTraffic" },
  { platform: "TikTok", text: "Loving the new beach resort in Diani! Best holiday ever. #TravelKenya" },
  { platform: "Instagram", text: "Farmers in Eldoret are complaining about fertilizer prices again." },
  { platform: "X", text: "The new SGR train from Mombasa to Nairobi is amazing! So fast and comfortable." },
  { platform: "Facebook", text: "Power outage in Kisumu for 6 hours now. Kenya Power needs to do better!" },
  { platform: "X", text: "Beautiful sunset at Lake Nakuru today. Kenya's nature is breathtaking." },
  { platform: "TikTok", text: "Street food tour in Mombasa Old Town - the biryani is incredible!" },
  { platform: "Instagram", text: "Water shortage crisis in Machakos County. We need solutions now!" },
  { platform: "X", text: "Excited about the new tech hub opening in Kilimani, Nairobi!" },
  { platform: "Facebook", text: "Terrible roads in Kakamega. Government promises remain unfulfilled." },
  { platform: "X", text: "Amazing wildlife sighting in Maasai Mara today! Lions everywhere." },
  { platform: "TikTok", text: "Healthcare workers in Kisii going on strike. Patients suffering!" },
];

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Create Supabase client with service role for inserts
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Step 1: Pick a random mock post (simulating the LISTENER agent)
    const post = MOCK_POSTS[Math.floor(Math.random() * MOCK_POSTS.length)];
    console.log(`👂 LISTENER: Processing post from ${post.platform}: "${post.text}"`);

    // Step 2: Analyze with AI (the ANALYST agent)
    console.log("🧠 ANALYST: Analyzing content with AI...");
    
    const analysisResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `You are a social media analyst for Kenya. Analyze posts and extract structured data.
            
Available counties: ${KENYA_COUNTIES.join(", ")}

When mapping locations to counties:
- Westlands, Kilimani, Karen, Lavington -> Nairobi
- Diani, Ukunda -> Kwale
- Eldoret -> Uasin Gishu
- Mombasa Old Town -> Mombasa
- Maasai Mara -> Narok
- Lake Nakuru -> Nakuru

Return ONLY valid JSON with no markdown or code blocks.`
          },
          {
            role: "user",
            content: `Analyze this social media post:
Platform: ${post.platform}
Post: "${post.text}"

Extract:
1. sentiment: "Positive", "Negative", or "Neutral"
2. county: The Kenya county this relates to (from the list provided)
3. risk_level: "High" (urgent issues, protests, crises), "Medium" (complaints, concerns), or "Low" (positive or neutral)

Return JSON only: {"sentiment": "", "county": "", "risk_level": ""}`
          }
        ],
        temperature: 0.3,
      }),
    });

    if (!analysisResponse.ok) {
      const errorText = await analysisResponse.text();
      console.error("AI analysis failed:", errorText);
      throw new Error(`AI analysis failed: ${analysisResponse.status}`);
    }

    const analysisData = await analysisResponse.json();
    const analysisText = analysisData.choices?.[0]?.message?.content || "";
    
    console.log("🧠 ANALYST raw response:", analysisText);

    // Parse the AI response
    let analysis;
    try {
      // Clean up any markdown code blocks if present
      const cleanedText = analysisText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      analysis = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      // Fallback analysis
      analysis = {
        sentiment: "Neutral",
        county: "Nairobi",
        risk_level: "Low"
      };
    }

    console.log("🧠 ANALYST parsed result:", analysis);

    // Step 3: Report to database (the REPORTER agent)
    console.log(`📝 REPORTER: Filing report for ${analysis.county}...`);

    const { data, error } = await supabase
      .from("agent_reports")
      .insert({
        platform: post.platform,
        content: post.text,
        sentiment: analysis.sentiment,
        county: analysis.county,
        risk_level: analysis.risk_level,
      })
      .select()
      .single();

    if (error) {
      console.error("Database insert error:", error);
      throw new Error(`Failed to file report: ${error.message}`);
    }

    console.log("✅ REPORT FILED successfully:", data);

    return new Response(
      JSON.stringify({
        success: true,
        report: data,
        analysis: analysis,
        post: post,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Symbiont Brain error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
