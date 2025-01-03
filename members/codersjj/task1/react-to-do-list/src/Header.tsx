interface HeaderProps {
  title?: string
}

export default function Header({ title = 'To-Do List' }: HeaderProps) {
  return <h1>{title}</h1>
}