const ProjectCard = ({ img, title, description, link, live }) => {
  return (
    <div
      onClick={() => window.open(live, "_blank", "noopener,noreferrer")}
      className="h-[350px] w-[230px] cursor-pointer rounded-lg text-white p-5 bg-fuchsia-600/20 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:bg-gradient-to-bl from-rose-600/50 to-fuchsia-500/50 "
    >
      <img src={img} alt="frontend" className="h-[120px] mx-auto rounded" />
      <h3 className="font-bold text-center mt-2">{title}</h3>
      <p className="text-xs text-center mt-2">{description}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="text-xs text-blue-400 underline"
      >
        see code..
      </a>
    </div>
  );
};

export default ProjectCard;
