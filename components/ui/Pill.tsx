interface Props {
  label: string;
}

export default function Pill({ label }: Props) {
  return <span className="pill">{label}</span>;
}
