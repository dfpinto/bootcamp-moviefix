import { AxiosRequestConfig } from 'axios';
import MovieFilter, { MovieFilterData } from 'components/MovieFilter';
import Pagination from 'components/Pagination';
import Movie from 'pages/Movie';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MovieDTO } from 'types/movieDTO';
import { SpringPage } from 'types/spring';
import { requestBackend } from 'util/requests';
import './style.css';

type ControlComponentsData = {
  activePage: number;
  filterData: MovieFilterData;
};

const MovieList = () => {
  const [page, setPage] = useState<SpringPage<MovieDTO>>();
  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
      filterData: { genre: null },
    });

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({
      activePage: pageNumber,
      filterData: controlComponentsData.filterData,
    });
  };

  const handleSubmitFilter = (data: MovieFilterData) => {
    setControlComponentsData({ activePage: 0, filterData: data });
  };

  const getMovies = useCallback(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: '/movies?genreId=0',
      withCredentials: true,
      params: {
        page: controlComponentsData.activePage,
        size: 3,
        genreId: controlComponentsData.filterData.genre?.id,
      },
    };

    requestBackend(params).then((response) => {
      setPage(response.data);
    });
  }, [controlComponentsData]);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  return (
    <div className="movies-container">
      <div className="movies-card">
        <MovieFilter onSubmitFilter={handleSubmitFilter} />
      </div>

      <div className="row">
        {page?.content.map((movie) => (
          <div key={movie.id} className="col-sm-6 col-md-12 movies-list">
            <Link to={`/movieDetails/${movie.id}`}>
              <Movie movieDTO={movie} showSynopsis={false} />
            </Link>
          </div>
        ))}
      </div>

      <Pagination
        forcePage={page?.number}
        pageCount={page ? page.totalPages : 0}
        rangeDisplay={3}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default MovieList;
