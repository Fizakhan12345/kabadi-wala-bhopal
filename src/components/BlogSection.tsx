import React from "react";
import { BLOG_POSTS, BlogPost } from "../data/blogsData";
import { BookOpen, Calendar, Clock, ArrowRight, User } from "lucide-react";

interface BlogSectionProps {
  onSelectBlog: (blogId: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onSelectBlog }) => {
  return (
    <section className="py-16 bg-white border-t border-slate-200 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="bg-emerald-100 text-[#0F766E] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
            Recycling & Scrap Guides
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Kabadiwala Bhopal Recycling Hub & Educational Articles
          </h2>
          <p className="text-slate-600 text-base">
            Expert insights on maximizing your scrap value, safe e-waste disposal, and office clearing in Bhopal.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post: BlogPost) => (
            <div
              key={post.id}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:border-[#0F766E] hover:shadow-md transition-all group"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-[#0F766E] px-2.5 py-1 rounded-full inline-block">
                  {post.category}
                </span>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0F766E] transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {post.readTime}
                </span>

                <button
                  onClick={() => onSelectBlog(post.id)}
                  className="font-bold text-[#0F766E] group-hover:text-emerald-800 flex items-center gap-1 hover:underline"
                >
                  Read Guide <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
