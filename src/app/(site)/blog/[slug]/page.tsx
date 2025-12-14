import React from 'react'
import BlogList from '@/components/Blog/BlogList'
import HeroSub from '@/components/SharedComponent/HeroSub'
import { getPostBySlug, getAllPosts } from "@/utils/markdown";
import markdownToHtml from "@/utils/markdownToHtml";
import { Blog } from "@/types/blog";
import Image from "next/image";
import { format } from "date-fns";

const BlogDetailPage = async ({ params }: { params: { slug: string } }) => {
    const post = getPostBySlug(params.slug, [
        "title",
        "excerpt",
        "date",
        "slug",
        "coverImage",
        "content",
    ]);

    const content = await markdownToHtml(post.content || "");
    const breadcrumbLinks = [
        { href: '/', text: 'Home' },
        { href: '/blog', text: 'Blog' },
        { href: `/blog/${post.slug}`, text: post.title as string },
    ]
    return (
        <>
            <HeroSub
                title={post.title as string}
                description={post.excerpt as string}
                breadcrumbLinks={breadcrumbLinks}
            />
            <div className="container pb-[100px]">
                <div className="max-w-[850px] mx-auto">
                    <div className="mb-8 overflow-hidden rounded-sm">
                        <Image
                            src={`/venus-nextjs/${post.coverImage!}`}
                            alt="imageeee"
                            className="w-full"
                            width={850}
                            height={440}
                            style={{ width: "100%", height: "auto" }}
                        />
                    </div>
                    <div className="px-12 py-4 shadow-blog-detail bg-white dark:bg-dark-200">
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-semibold leading-loose text-SereneGray">
                                {format(new Date(post.date as string), "dd MMM yyyy")}
                            </span>
                            <span className="w-[5px] h-[5px] rounded-full bg-primary"></span>
                            <span className="text-sm font-semibold leading-loose text-SereneGray">
                                8 min read
                            </span>
                        </div>
                    </div>
                    <div
                        className="prose-base dark:prose-invert max-w-none mt-10"
                        dangerouslySetInnerHTML={{ __html: content }}
                    ></div>
                </div>
            </div>
        </>
    )
}

export default BlogDetailPage;

export async function generateStaticParams() {
    const posts = getAllPosts(["slug"]);

    return posts.map((post) => ({
        slug: post.slug,
    }));
}
