import React from "react";

const Reviews = () => {
  return (
    <div className="container mx-auto">
      <div className=" bg-white rounded-lg shadow-md p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-white  mr-3">
              M
            </div>
            <div>
              <div className="font-semibold text-gray-800">MaxAdventures</div>
              <div className="text-xs text-gray-500">Wed Mar 05 2025</div>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <svg
              className="w-4 h-4 text-green-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-xs text-green-600 font-medium">
              Review Verified
            </span>
          </div>
        </div>
        {/* Title & Stars */}
        <div className="mt-4">
          <div className="font-bold text-lg text-gray-900">
            I'm already loving the results
          </div>
          <div className="flex items-center mt-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.049 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
              </svg>
            ))}
          </div>
        </div>
        {/* Review Text */}
        <div className="mt-3 text-gray-700 text-sm">
          I've been to Seojin a few times before and hve had a spectacular
          experience every time, so i knew! I wanted to come back for a surgery
          that is an important as this one. Doctor Lee is super nice and
          meticulous about everything, and the staff are always super welcoming.
          I was honestly pretty nervous, but felt a lot better after seeing the
          design and talking with Doctor Lee about the whole process. It's only
          been one week since the surgery but I can already tell that it's
          exactly what I wanted!
          <br />
          <br />
          After my firsy visit, they even gave me a brochure detailing how many
          hairs were taken from where and by who. I'm looking forward to going
          back next week and the week…
        </div>
        {/* Images */}
        <div className="flex space-x-3 mt-4">
          {[1, 2, 3].map((img, i) => (
            <div
              key={i}
              className="w-16 h-16 rounded-md overflow-hidden bg-gray-100"
            >
              <img
                src={`https://via.placeholder.com/64x64?text=Img${i + 1}`}
                alt={`Review photo ${i + 1}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
