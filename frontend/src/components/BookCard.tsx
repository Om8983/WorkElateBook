import React from "react";
import { Link } from "react-router-dom";

type BookCardProps = {
    bookImage: string;
    bookName: string;
    author: string;
    id: string
};

export const BookCard = ({ bookImage, bookName, author, id }: BookCardProps) => {
    return (
        <Link to={`/book/${id}`}>
            <div className="w-full max-w-[240px] sm:max-w-[280px] md:max-w-[300px] lg:max-w-[320px]  ">
                <img
                    src={bookImage}
                    alt={bookName}
                    className="w-full h-64 sm:h-72 md:h-80 object-cover"
                />
                <div className="p-4 text-center">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 truncate">{bookName}</h3>
                    <p className="text-sm text-gray-500 mt-1 truncate">{author}</p>
                </div>
            </div>
        </Link>
    );
};