export default function PageHeader({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) {
  return (
    <header>
      <h1 className="display-6 fw-medium">{title}</h1>
      <p className="lead">{subTitle}</p>
    </header>
  );
}
