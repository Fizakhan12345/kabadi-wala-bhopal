import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// In-memory bookings store for recent leads generated
interface BookingLead {
  id: string;
  name: string;
  phone: string;
  address: string;
  area: string;
  scrapTypes: string[];
  estimatedWeight: string;
  preferredDate: string;
  preferredTime: string;
  createdAt: string;
  status: "Pending" | "Confirmed" | "Completed";
}

const bookingsStore: BookingLead[] = [
  {
    id: "KB-1001",
    name: "Ramesh Sharma",
    phone: "98260XXXXX",
    address: "E-7 Arera Colony, Near Sai Temple",
    area: "Arera Colony",
    scrapTypes: ["Paper / Newspaper", "Cardboard", "Old Metal"],
    estimatedWeight: "30-50 kg",
    preferredDate: "Today",
    preferredTime: "11:00 AM - 1:00 PM",
    createdAt: new Date().toISOString(),
    status: "Confirmed",
  },
  {
    id: "KB-1002",
    name: "Vikram Malhotra",
    phone: "98930XXXXX",
    address: "Zone II, MP Nagar, Opposite Dainik Bhaskar",
    area: "MP Nagar",
    scrapTypes: ["E-Waste", "Computers", "Office Paper"],
    estimatedWeight: "100+ kg (Commercial)",
    preferredDate: "Tomorrow",
    preferredTime: "02:00 PM - 04:00 PM",
    createdAt: new Date().toISOString(),
    status: "Confirmed",
  },
  {
    id: "KB-1003",
    name: "Pooja Verma",
    phone: "94250XXXXX",
    address: "Kolar Road, Fine Avenue",
    area: "Kolar Road",
    scrapTypes: ["Old AC", "Fridge", "Copper Wires"],
    estimatedWeight: "50-100 kg",
    preferredDate: "Today",
    preferredTime: "04:00 PM - 06:00 PM",
    createdAt: new Date().toISOString(),
    status: "Pending",
  },
];

// Helper to initialize Gemini SDK safely
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Click tracking store
let callClickCount = 48;
let whatsappClickCount = 112;

// API Routes

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "Kabadiwala Bhopal API", time: new Date() });
});

// GET leads
app.get("/api/leads", (req, res) => {
  res.json({
    success: true,
    total: bookingsStore.length,
    leads: bookingsStore.map((b) => ({
      id: b.id,
      name: b.name,
      mobile: b.phone,
      locality: b.area,
      address: b.address,
      scrapCategory: b.scrapTypes.join(", "),
      estimatedWeightKg: b.estimatedWeight,
      pickupDate: b.preferredDate,
      preferredTimeSlot: b.preferredTime,
      status: b.status.toUpperCase(),
      createdAt: b.createdAt,
    })),
  });
});

// PATCH lead status
app.patch("/api/leads/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const booking = bookingsStore.find((b) => b.id === id);
  if (!booking) {
    res.status(404).json({ error: "Lead not found" });
    return;
  }
  if (status) {
    booking.status = status === "COMPLETED" ? "Completed" : status === "CONTACTED" ? "Confirmed" : "Pending";
  }
  res.json({ success: true, booking });
});

// Track Call / WhatsApp clicks
app.post("/api/track-click", (req, res) => {
  const { type, pageUrl } = req.body;
  if (type === "CALL") {
    callClickCount++;
  } else if (type === "WHATSAPP") {
    whatsappClickCount++;
  }
  res.json({ success: true, callClickCount, whatsappClickCount });
});

// GET Admin Stats
app.get("/api/admin/stats", (req, res) => {
  const pendingCount = bookingsStore.filter((b) => b.status === "Pending").length;
  const completedCount = bookingsStore.filter((b) => b.status === "Completed").length;
  res.json({
    totalLeads: bookingsStore.length,
    pendingLeads: pendingCount,
    completedLeads: completedCount,
    totalCallClicks: callClickCount,
    totalWhatsappClicks: whatsappClickCount,
  });
});

// Submit Doorstep Pickup Lead
app.post("/api/bookings", (req, res) => {
  try {
    const { name, phone, address, area, scrapTypes, estimatedWeight, preferredDate, preferredTime, notes } = req.body;

    if (!name || !phone || !area) {
      res.status(400).json({ error: "Name, phone number, and area are required." });
      return;
    }

    const bookingId = `KB-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: BookingLead = {
      id: bookingId,
      name,
      phone,
      address: address || `${area}, Bhopal`,
      area,
      scrapTypes: Array.isArray(scrapTypes) ? scrapTypes : [scrapTypes || "General Scrap"],
      estimatedWeight: estimatedWeight || "Unspecified",
      preferredDate: preferredDate || "Today",
      preferredTime: preferredTime || "As soon as possible",
      createdAt: new Date().toISOString(),
      status: "Pending",
    };

    bookingsStore.unshift(newBooking);

    // Format WhatsApp message text for quick 1-click customer sending
    const waText = encodeURIComponent(
      `*NEW SCRAP PICKUP REQUEST - ${bookingId}*\n\n` +
      `👤 *Name:* ${name}\n` +
      `📞 *Phone:* ${phone}\n` +
      `📍 *Area:* ${area}\n` +
      `🏠 *Address:* ${address || "Bhopal"}\n` +
      `📦 *Scrap Items:* ${newBooking.scrapTypes.join(", ")}\n` +
      `⚖️ *Est. Weight:* ${newBooking.estimatedWeight}\n` +
      `📅 *Preferred Slot:* ${preferredDate} (${preferredTime})\n` +
      (notes ? `📝 *Notes:* ${notes}\n\n` : "\n") +
      `Please confirm pickup time and assign kabadiwala executive.`
    );

    const whatsappUrl = `https://wa.me/918871600497?text=${waText}`;

    res.json({
      success: true,
      booking: newBooking,
      whatsappUrl,
      message: "Scrap pickup request registered successfully! Our team will call you shortly.",
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ error: "Failed to process pickup request." });
  }
});

// AI Scrap Estimator & Photo Analyzer
app.post("/api/estimate-scrap", async (req, res) => {
  try {
    const { imageBase64, itemsList, area } = req.body;
    const ai = getGeminiClient();

    if (imageBase64 && ai) {
      // Clean base64 string
      const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
      
      const prompt = `Analyze this image of household/commercial scrap materials for Kabadiwala Bhopal.
Identify the scrap items visible (e.g. newspaper, cardboard, plastic bottles, iron, copper, aluminum, old appliances, e-waste).
Estimate the approximate weight in kg and calculated value in Indian Rupees (INR - ₹) based on Bhopal market rates:
- Newspaper: ₹14-16/kg
- Cardboard/Craft paper: ₹10-12/kg
- Iron/Steel: ₹28-32/kg
- Copper: ₹420-480/kg
- Aluminum: ₹110-130/kg
- Brass: ₹310-340/kg
- Hard Plastic: ₹12-16/kg
- E-Waste/Laptops: ₹150-300/unit
- AC/Fridge: ₹1000-2500/unit

Return ONLY a structured JSON response with this exact schema:
{
  "detectedItems": [
    { "name": "Item Name", "category": "Paper/Metal/Plastic/E-waste/Appliance", "estimatedWeightKg": 10, "ratePerKgOrUnit": 15, "estimatedTotalInr": 150 }
  ],
  "overallEstimatedWeightKg": 25,
  "overallEstimatedValueInr": 450,
  "confidence": "High/Medium",
  "ecoImpact": { "co2SavedKg": 30, "treesSaved": 0.5 },
  "recommendation": "Pickup advice or special handling advice"
}`;

      try {
        const geminiRes = await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: {
            parts: [
              {
                inlineData: {
                  mimeType: "image/jpeg",
                  data: cleanBase64,
                },
              },
              { text: prompt },
            ],
          },
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                detectedItems: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      category: { type: Type.STRING },
                      estimatedWeightKg: { type: Type.NUMBER },
                      ratePerKgOrUnit: { type: Type.NUMBER },
                      estimatedTotalInr: { type: Type.NUMBER },
                    },
                    required: ["name", "estimatedTotalInr"],
                  },
                },
                overallEstimatedWeightKg: { type: Type.NUMBER },
                overallEstimatedValueInr: { type: Type.NUMBER },
                confidence: { type: Type.STRING },
                ecoImpact: {
                  type: Type.OBJECT,
                  properties: {
                    co2SavedKg: { type: Type.NUMBER },
                    treesSaved: { type: Type.NUMBER },
                  },
                },
                recommendation: { type: Type.STRING },
              },
              required: ["detectedItems", "overallEstimatedValueInr"],
            },
          },
        });

        const jsonText = geminiRes.text;
        if (jsonText) {
          const parsed = JSON.parse(jsonText);
          res.json({ success: true, estimate: parsed });
          return;
        }
      } catch (geminiError) {
        console.warn("Gemini vision analysis fallback:", geminiError);
      }
    }

    // Fallback or Item selection based estimation calculation
    let calculatedTotal = 0;
    let totalWeight = 0;
    const detectedItems: any[] = [];

    if (Array.isArray(itemsList) && itemsList.length > 0) {
      itemsList.forEach((item: { name: string; category: string; quantity: number; rate: number }) => {
        const itemTotal = item.quantity * item.rate;
        calculatedTotal += itemTotal;
        totalWeight += item.quantity;
        detectedItems.push({
          name: item.name,
          category: item.category || "Scrap",
          estimatedWeightKg: item.quantity,
          ratePerKgOrUnit: item.rate,
          estimatedTotalInr: itemTotal,
        });
      });
    } else {
      // Default sample estimation for quick testing
      detectedItems.push(
        { name: "Newspaper & Books", category: "Paper", estimatedWeightKg: 15, ratePerKgOrUnit: 16, estimatedTotalInr: 240 },
        { name: "Corrugated Cardboard", category: "Paper", estimatedWeightKg: 10, ratePerKgOrUnit: 12, estimatedTotalInr: 120 },
        { name: "Mixed Heavy Metal / Steel", category: "Metal", estimatedWeightKg: 12, ratePerKgOrUnit: 30, estimatedTotalInr: 360 }
      );
      calculatedTotal = 720;
      totalWeight = 37;
    }

    res.json({
      success: true,
      estimate: {
        detectedItems,
        overallEstimatedWeightKg: totalWeight,
        overallEstimatedValueInr: calculatedTotal,
        confidence: "Calculated",
        ecoImpact: {
          co2SavedKg: Math.round(totalWeight * 1.5),
          treesSaved: Math.round((totalWeight / 20) * 10) / 10,
        },
        recommendation: `Instant free doorstep pickup available in ${area || "Bhopal"}. Cash paid immediately on spot!`,
      },
    });
  } catch (err) {
    console.error("AI Estimate error:", err);
    res.status(500).json({ error: "Failed to estimate scrap value." });
  }
});

// Recent stats API
app.get("/api/stats", (req, res) => {
  res.json({
    pickupsToday: 14 + Math.floor(Math.random() * 5),
    totalRecycledTons: 845,
    happyCustomers: 12400,
    co2SavedTons: 1120,
    activeLocality: "MP Nagar & Arera Colony",
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Kabadiwala Bhopal server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
