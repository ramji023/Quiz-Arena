import { v2 as cloudinary } from "cloudinary";
import { prisma } from "@repo/database"; // your prisma client from @rpeo/database package

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function quizImageGenerator({ title }: { title: string }) {
  const query = encodeURIComponent(title);
  const pexelsResponse = await fetch(
    `https://api.pexels.com/v1/search?query=${query}&per_page=1&orientation=landscape`,
    {
      headers: {
        Authorization: process.env.PEXELS_API_KEY!,
      },
    },
  );

  if (!pexelsResponse.ok) {
    throw new Error(`Pexels fetch failed: ${pexelsResponse.status}`);
  }

  interface PexelsResponse {
    photos: {
      src: {
        medium: string;
        large: string;
        original: string;
      };
    }[];
  }

  const pexelsData = (await pexelsResponse.json()) as PexelsResponse;
  const imageUrl = pexelsData.photos[0]?.src?.medium;

  if (!imageUrl) throw new Error("No image found on Pexels");

  //upload imeage to cloudinary
  const uploadResult = await cloudinary.uploader.upload(imageUrl, {
    folder: "QuizArena/quiz-thumbnails",
    resource_type: "image",
    overwrite: true,
  });

  const quizImageUrl = uploadResult.secure_url;
  return quizImageUrl;
}

export async function updateQuizThumbnails(quizId: string, imageUrl: string) {
  await prisma.quiz.update({
    where: { id: quizId },
    data: { thumbnails: imageUrl },
  });
}

export async function isImagePresent() {
  const quizWithoutThumbnail = await prisma.quiz.findMany({
    where: {
      OR: [{ thumbnails: null }, { thumbnails: "" }],
    },
    select: {
      id: true,
      title: true,
      description: true,
    },
  });

  if (quizWithoutThumbnail.length === 0) {
    console.log("All Quizzes have thumbnails");
    return;
  }

  const results = await Promise.allSettled(
    quizWithoutThumbnail.map(async (quiz) => {
      const imageUrl = await quizImageGenerator({
        title: quiz.title,
      });
      await updateQuizThumbnails(quiz.id, imageUrl);
      return imageUrl;
    }),
  );

  results.forEach((result, index) => {
    const quiz = quizWithoutThumbnail[index];
    if (result.status === "fulfilled") {
      console.log(
        ` Thumbnail created for quiz "${quiz?.title}": ${result.value}`,
      );
    } else {
      console.error(` Failed for quiz "${quiz?.title}":`, result.reason);
    }
  });
}
