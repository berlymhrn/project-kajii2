function Review({ img, name, review }) {
    return (
        <div className="group flex flex-col rounded-xl p-4 md:p-6 bg-customGreen border border-gray-200 max-w-sm w-full h-60 hover:bg-primaryColor hover:text-white shadow-lg">
            <div className="flex items-center gap-x-4">
                <img
                    className="rounded-full size-20 object-cover"
                    src={img}
                    alt="User Profile"
                />
                <h3 className="text-p18 font-bold text-gray-800 group-hover:text-white">
                    {name}
                </h3>
            </div>
            <p className="text-p16 font-medium mt-3 text-gray-600 group-hover:text-white">
                {review}
            </p>
        </div>
    );
}

export default Review;
