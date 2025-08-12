import { useState } from "react";

export function ReviewsPage() {
  const [formData, setFormData] = useState({
    name: "",
    rating: 5,
    title: "",
    review: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Review submitted:", formData);
    // TODO: Save to Firebase
    alert("✅ Review submitted successfully!");
    setFormData({ name: "", rating: 5, title: "", review: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Customer Reviews</h1>
          <p className="text-gray-600 text-lg">Share your experience with our CNC foam cutting machine</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Example Review */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Recent Reviews</h2>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-700 to-white-300 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  A
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-800">Alex Johnson</h3>
                    <div className="flex text-yellow-400">
                      {"★".repeat(5)}
                    </div>
                  </div>
                  <h4 className="font-medium text-gray-700 mb-3">Exceptional Precision and Ease of Use</h4>
                  <p className="text-gray-600 leading-relaxed">
                    The EDGE MAKER V1 exceeded my expectations! The precision is incredible, and the web interface makes it so easy to upload designs and control the cutting process. I've been using it for architectural models and the results are consistently perfect. The G-code generation is seamless and the machine responds quickly. Highly recommend for both beginners and professionals.
                  </p>
                  <p className="text-sm text-gray-400 mt-4">Posted 2 days ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Add Review Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Write a Review</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
                  <option value={4}>⭐⭐⭐⭐ Very Good</option>
                  <option value={3}>⭐⭐⭐ Good</option>
                  <option value={2}>⭐⭐ Fair</option>
                  <option value={1}>⭐ Poor</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Review Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Summarize your experience"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                <textarea
                  name="review"
                  value={formData.review}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Share your detailed experience with the EDGE MAKER V1..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-800 to-green-200 text-white font-semibold py-3 px-6 rounded-xl hover:from-green-700 hover:to-green-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

