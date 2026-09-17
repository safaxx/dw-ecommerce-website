import { Helmet } from 'react-helmet-async';

function Metadata({ title }) {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  )
}

export default Metadata