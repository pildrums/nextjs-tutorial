import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Seo from '../components/Seo';

const Home = ({ results }) => {
  const router = useRouter();
  const onClick = (id) => {
    router.push(`/movies/${id}`);
  };
  return (
    <Container>
      <Seo title="Home" />
      {results?.map((movie) => (
        <div className="movie" key={movie.id} onClick={() => onClick(movie.id)}>
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
          <h4>
            <Link href={`/movies/${movie.id}`} key={movie.id}>
              <a>{movie.title}</a>
            </Link>
          </h4>
        </div>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 20px;
  gap: 20px;
  .movie {
    cursor: pointer;
  }
  .movie img {
    max-width: 100%;
    border-radius: 12px;
    transition: transform 0.2s ease-in-out;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  }
  .movie:hover img {
    transform: scale(1.05) translateY(-10px);
  }
  .movie h4 {
    font-size: 18px;
    text-align: center;
  }
`;

export default Home;

export async function getServerSideProps() {
  const { results } = await (
    await fetch(`http://localhost:3000/api/movies`)
  ).json();
  return {
    props: {
      results,
    },
  };
}
