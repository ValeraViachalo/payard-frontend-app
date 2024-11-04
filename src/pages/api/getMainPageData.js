import { groq } from "next-sanity";
import { sanityClient } from "../../../sanity";

const heroCards = `
  "heroCards": heroCards.list[] {
    title,
    popUpText,
    "video": video.asset->url
  },
`;

const services = `
  "services": services.cards[] {
    ...,
    "bg": bg.asset->url,
    "icon": icon.asset->url
  },
`

const appInstruction = `"appInstruction": appInstruction.asset->url,`;

const signUpInstruction = `"signUpInstruction": signUpInstruction.asset->url,`;

const consult = `"consulting": consulting.list,`;

const query = groq`
  *[_type == "homePage"][0] {
    ${heroCards}
    ${services}
    ${consult}
    ${appInstruction}
    ${signUpInstruction}
  }
`;

export default async function handler(req, res) {
  try {
    console.log("Attempting to fetch data from Sanity...");
    const data = await sanityClient.fetch(query);

    if (!data) {
      console.log("No data received from Sanity");
      return res.status(404).json({ message: "No data found" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data from Sanity:", error);
    res.status(500).json({
      message: error.message,
    });
  }
}