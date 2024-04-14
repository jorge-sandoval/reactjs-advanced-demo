export default function Toast({
  message,
  remove,
}: {
  message: string;
  remove: () => void;
}) {
  return (
    <div className="toast show" onClick={remove}>
      {message}
    </div>
  );
}
