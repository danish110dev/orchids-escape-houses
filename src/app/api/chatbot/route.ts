import { NextRequest, NextResponse } from "next/server";

const WEBSITE_CONTEXT = `
You are a helpful assistant for Group Escape Houses, a luxury hen party accommodation provider in the UK.

COMPANY INFO:
- Email: hello@groupescapehouses.co.uk
- Office: 11a North St, Brighton and Hove, Brighton BN41 1DH
- We specialize in luxury hen party houses with hot tubs, pools, games rooms, and spa facilities

SAMPLE PROPERTIES:
1. Brighton Manor - Brighton, East Sussex
   - Sleeps 16, 8 bedrooms, 6 bathrooms
   - Hot tub, indoor pool, games room, BBQ area
   - From £950 midweek, £1200 weekend

2. Bath Spa Retreat - Bath, Somerset
   - Sleeps 20, 10 bedrooms
   - Games room, cinema, spa facilities
   - From £95 per person

3. Manchester Party House - Manchester
   - Sleeps 14, 7 bedrooms
   - Hot tub, BBQ area, games room
   - From £79 per person

EXPERIENCES WE OFFER:
- Cocktail Masterclass (2 hours) - from £45pp
- Butlers in the Buff - from £150
- Life Drawing (1.5-2 hours) - from £35pp
- Private Chef - from £50pp
- Spa Treatments - various prices
- Bottomless Brunch - from £40pp

BOOKING PROCESS:
1. Browse properties and select your favorite
2. Check availability and request a quote
3. 25% deposit required to secure booking
4. Remaining balance due 6 weeks before arrival
5. £500 refundable damage deposit required

HOUSE RULES (typical):
- Check-in: 4pm
- Check-out: 10am
- No smoking inside
- Quiet hours: 11pm - 8am
- Pets policy varies by property

Be friendly, helpful, and encourage enquiries. Always mention they can email hello@groupescapehouses.co.uk or visit the website for more details.
`;

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          reply: "I'm currently offline. Please email us at hello@groupescapehouses.co.uk or call our office for immediate assistance!",
        },
        { status: 200 }
      );
    }

    const messages = [
      { role: "system", content: WEBSITE_CONTEXT },
      ...history.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: "user", content: message },
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        temperature: 0.7,
        max_tokens: 300,
      }),
    });

    const data = await response.json();

    if (data.choices && data.choices[0]) {
      return NextResponse.json({
        reply: data.choices[0].message.content,
      });
    }

    return NextResponse.json(
      {
        reply: "I'm having trouble right now. Please email hello@groupescapehouses.co.uk for assistance!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Chatbot error:", error);
    return NextResponse.json(
      {
        reply: "Sorry, I'm experiencing technical difficulties. Please email hello@groupescapehouses.co.uk!",
      },
      { status: 200 }
    );
  }
}