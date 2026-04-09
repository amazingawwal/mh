import { redirect } from "next/navigation";
import { getBook } from "@/lib/hadith/api";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ book: string }>;
};

export default async function HadithBookPage({ params }: Props) {
  const { book: bookId } = await params;
  const book = getBook(bookId);
  if (!book) notFound();
  redirect(`/hadith/${bookId}/1`);
}