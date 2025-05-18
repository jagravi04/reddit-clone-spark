
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { mockCommunities } from "@/data/mockData";
import { Home, Plus, TrendingUp, Star } from "lucide-react";

const Sidebar = () => {
  const topCommunities = [...mockCommunities].sort((a, b) => b.members - a.members).slice(0, 5);

  return (
    <aside className="w-64 hidden md:block">
      <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden mb-4">
        <div className="p-4 bg-reddit-primary text-white">
          <h2 className="font-semibold">Home</h2>
        </div>
        <div className="p-2">
          <nav className="space-y-1">
            <Link
              to="/"
              className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100"
            >
              <Home size={18} className="mr-2" />
              Home
            </Link>
            <Link
              to="/popular"
              className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100"
            >
              <TrendingUp size={18} className="mr-2" />
              Popular
            </Link>
            <Link
              to="/favorites"
              className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100"
            >
              <Star size={18} className="mr-2" />
              Favorites
            </Link>
          </nav>
        </div>
      </div>

      <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 bg-reddit-primary text-white">
          <h2 className="font-semibold">Top Communities</h2>
        </div>
        <div className="p-2">
          <div className="divide-y">
            {topCommunities.map((community, index) => (
              <Link
                key={community.id}
                to={`/r/${community.slug}`}
                className="flex items-center py-2 px-3 hover:bg-gray-100 rounded-md"
              >
                <span className="text-gray-500 font-medium w-5">{index + 1}</span>
                {community.imageUrl ? (
                  <img
                    src={community.imageUrl}
                    alt={community.name}
                    className="h-6 w-6 rounded-full mx-2"
                  />
                ) : (
                  <div className="h-6 w-6 rounded-full bg-reddit-primary mx-2" />
                )}
                <span className="ml-2 flex-1 truncate">{community.name}</span>
              </Link>
            ))}
          </div>
          <div className="mt-3 px-3">
            <Button variant="outline" className="w-full">
              <Link to="/communities" className="flex items-center w-full justify-center">
                <Plus size={16} className="mr-2" />
                View All
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
