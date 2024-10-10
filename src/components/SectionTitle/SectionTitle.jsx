const SectionTitle = ({ heading, subheading }) => {
  return (
    <div className="text-center w-2/3 md:w-4/12 mx-auto my-8">
      <p className="text-yellow-400  mb-4">{heading} </p>
      <h3 className="text-2xl md:text-3xl border-y-4 my-4">{subheading}</h3>
    </div>
  );
};

export default SectionTitle;
