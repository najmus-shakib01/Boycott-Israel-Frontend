import PalestineHistoryContent from "./PalestineHistoryContent";

const PalestineHistory = () => {
  const contentList = PalestineHistoryContent();

  return (
    <div>
      <section className="max-w-6xl mx-auto">
        {contentList.map((content, index) => (
          <div key={index}>
            <h2 className="text-3xl font-bold mb-4 text-center">
              {content.title}
            </h2>
            <div className="px-4">
              <p className="text-md text-gray-600 dark:text-gray-300 font-bold text-center">
              {content.author}
            </p>
            <p className="text-lg leading-relaxed text-justify whitespace-pre-line">
              {content.content}
            </p>
            <div className="font-bold">
              <p className="mt-6 text-right italic">
                {content.footer.authorTitle}
              </p>
              <p className="mt-2 text-right italic">
                — {content.footer.institution}
              </p>
            </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default PalestineHistory;
