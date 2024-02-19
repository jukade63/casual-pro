import {
  ArrowUpZA,
  HeartHandshake,
  NotebookPen,
  UserRoundSearch,
} from "lucide-react";
import Image from "next/image";
import React from "react";

export default function HowItWork() {
  return (
    <section className="bg-gray-100 py-16 lg:px-8" id="how-it-works">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-12">
          How CasualPro Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <NotebookPen />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Post Your Job</h3>
              <p className="text-gray-600">
                Begin by posting your job opening on CasualPro. Provide detailed
                information about the role, including job title, description,
                requirements, and any other relevant details.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <UserRoundSearch />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Targeted Matching</h3>
              <p className="text-gray-600">
                Once your job is posted, CasualPro's advanced matching algorithm
                goes to work. We analyze candidate profiles and qualifications
                to identify the best matches for your job posting.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <ArrowUpZA />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Review and Shortlist
              </h3>
              <p className="text-gray-600">
                Review the candidates recommended by CasualPro and shortlist
                those that align with your needs. Dive deeper into their
                profiles, portfolios, and experience to ensure they meet your
                criteria. Our platform provides all the information you need to
                make informed decisions.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <HeartHandshake />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Hire with Confidence
              </h3>
              <p className="text-gray-600">
                Once you've found the perfect candidate, extend the job offer
                through CasualPro. Manage all aspects of the hiring process,
                including negotiations, contract signing, and onboarding, with
                ease. Our platform ensures a smooth transition from candidate
                selection to employee integration.
              </p>
            </div>
          </div>
          {/* Add more steps similarly */}
        </div>
      </div>
    </section>
  );
}
