import React from "react";
import { BLOG_POSTS, BlogPost } from "../data/blogsData";
import { BookOpen, Calendar, Clock, User, X, HelpCircle, Phone, ArrowRight } from "lucide-react";

interface BlogDetailModalProps {
  blogId: string | null;
  onClose: () => void;
  onBookPickup: () => void;
}

export const BlogDetailModal: React.FC<BlogDetailModalProps> = ({
  blogId,
  onClose,
  onBookPickup,
}) => {
  if (!blogId) return null;

  const post: BlogPost | undefined = BLOG_POSTS.find(
    (b) => b.id === blogId || b.slug === blogId
  ) || BLOG_POSTS[0];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative border border-slate-200 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-800 bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Blog Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-[#0F766E] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" /> {post.category}
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {post.title}
          </h2>

          <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
            <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {post.author}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.publishedDate}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
          </div>
        </div>

        {/* Blog Article HTML Content */}
        <div
          className="prose prose-sm max-w-none text-slate-700 leading-relaxed border-t border-b border-slate-100 py-4 space-y-3"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* Article FAQs */}
        {post.faqs.length > 0 && (
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-[#0F766E]" /> Related Questions:
            </h3>
            <div className="space-y-2 text-xs">
              {post.faqs.map((faq, idx) => (
                <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                  <p className="font-bold text-slate-900">Q: {faq.question}</p>
                  <p className="text-slate-600">A: {faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => {
              onBookPickup();
              onClose();
            }}
            className="btn-cta-orange w-full sm:w-auto flex-1 py-3.5 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-md"
          >
            <span>Book Doorstep Scrap Pickup</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="tel:8871600497"
            className="btn-call w-full sm:w-auto px-5 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md"
          >
            <Phone className="w-4 h-4" /> Call 88716 00497
          </a>
        </div>

      </div>
    </div>
  );
};
