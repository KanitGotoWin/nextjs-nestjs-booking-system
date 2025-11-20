type Props = {
  title: string;
};

export default function UserTitle({ title }: Props) {
  return <h1 className="text-2xl font-semibold text-center">{title}</h1>;
}
