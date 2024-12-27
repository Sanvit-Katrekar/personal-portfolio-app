import { Link } from "@remix-run/react";

export interface PortfolioPreviewProps {
  current: boolean;
  data: any;
}

export const PortfolioPreview = (props: PortfolioPreviewProps) => {
  const { current = false, data } = props;

  // Setup
  const date = new Date(data.date);

  // Markup
  const _renderImage = () => (
    <div className="w-full">
      <img
        alt=""
        className="w-full border transition-all hover:rotate-3 hover:scale-110"
        height="auto"
        src={data.images[0].url}
        width="auto"
      />
    </div>
  );

  return (
    <Link
      className="work-preview text-color-copy"
      prefetch="intent"
      to={`/portfolio`}
    >

      <h3 className="m-0 font-font-serif text-xl font-bold">{data.title}</h3>
      <div className="mt-1 mb-6 flex items-baseline gap-2 font-medium text-color-copy-dark">
        {!current && <span>{new Date(date).getFullYear()}</span>}
        {!current && <span className="font-light">|</span>}
        <span>{data.company}</span>
      </div>

      <p>{data.overview}</p>
    </Link>
  );
};
