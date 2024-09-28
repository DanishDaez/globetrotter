function getIconForCategory(category) {
    const iconMap = {
        "Trending": "fire",
        "Rooms": "bed",
        "Iconic Cities": "city",
        "Mountains": "mountain",
        "Castles": "fort-awesome",
        "Amazing Pools": "person-swimming",
        "Camping": "campground",
        "Farms": "cow",
        "Arctic": "snowflake",
        "Dome": "igloo",
        "Boats": "ship"
    };
    return iconMap[category] || "question";
}

module.exports = getIconForCategory;