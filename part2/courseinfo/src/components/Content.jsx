import Part from './Part'

const Content = ({ parts }) => parts.map((part, i) => <Part key={i} part={part} />)

export default Content