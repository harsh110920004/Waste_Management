import axios from "axios";

export const verifyWaste = async (imageUrl) => {
  try {
    const response = await axios.post(
      "https://router.huggingface.co/hf-inference/models/google/vit-base-patch16-224",
      {
        inputs: imageUrl
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const predictions = response.data;

    console.log("AI RESULT:", predictions);

    const wasteKeywords = [
  "trash",
  "garbage",
  "waste",
  "plastic",
  "bottle",
  "bag",
  "paper",
  "wrapper",
  "can",
  "pollution"
];

   const isWaste = predictions.some(item => {
  const label = item.label.toLowerCase();
  return (
    item.score > 0.3 &&
    wasteKeywords.some(keyword => label.includes(keyword))
  );
});
    return isWaste;

  } catch (err) {
    console.log("AI ERROR:", err.response?.data || err.message);
    return false;
  }
};