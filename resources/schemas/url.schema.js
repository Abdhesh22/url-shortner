module.exports = (mongoose) => {
  const { Schema } = mongoose;
  return new Schema(
    {
      shortUrl: { type: String },
      longUrl: { type: String },
    },
    {
      timestamps: { createdAt: "createdOn", updatedAt: "updatedOn" },
    }
  );
};
