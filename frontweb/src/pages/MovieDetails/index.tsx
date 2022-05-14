import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Review } from 'types/review';
import MovieDetailsInfo from './MovieDetailsInfo';
import IconUserReview from 'assets/images/icon-user-review.png';
import ButtonIcon from 'components/ButtonIcon';
import { useForm } from 'react-hook-form';
import { hasAnyRole, requestBackend } from 'util/requests';
import Movie from 'pages/Movie';
import { MovieDTO } from 'types/movieDTO';
import { toast } from 'react-toastify';
import './style.css';

type UrlParams = {
  movieId: string;
};

const MovieDetails = () => {
  const { movieId } = useParams<UrlParams>();
  const [movieDTO, setMovie] = useState<MovieDTO>();
  const [reviews, setReview] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<Review>();

  const onSubmit = (formData: Review) => {
    if(formData.text === '') {
      toast.error('Favor digitar um comentário.');
      return;
    }
    formData.movieId = movieDTO?.id;
    const paramsReview: AxiosRequestConfig = {
      withCredentials: true,
      method: 'POST',
      data: formData,
      url: `/reviews`,
    };
    requestBackend(paramsReview)
      .then((response) => {
        setReview([...reviews, response.data]);
        resetField('text');
        toast.info('Comentário salvo!');
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  useEffect(() => {
    const paramsMovie: AxiosRequestConfig = {
      withCredentials: true,
      method: 'GET',
      url: `/movies/${movieId}`,
    };
    const paramsReviews: AxiosRequestConfig = {
      withCredentials: true,
      method: 'GET',
      url: `/reviews/${movieId}`,
    };
    setIsLoading(true);
    requestBackend(paramsMovie).then((response) => {
      setMovie(response.data);
    });
    requestBackend(paramsReviews)
      .then((response) => {
        setReview(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [movieId]);

  return (
    <div className="movie-details-container">
      <form name="formReview" onSubmit={handleSubmit(onSubmit)}>
        <div className="movie-details-card">
          <Movie movieDTO={movieDTO} showSynopsis={true} />
          {hasAnyRole(['ROLE_MEMBER']) ? (
            <div className="review-push">
              <input
                {...register('text')}
                type="text"
                name="text"
                placeholder='Digite sua avaliação aqui'
              />
              <div className="review-push-btn">
                <ButtonIcon text="SALVAR AVALIAÇÃO" />
              </div>
            </div>
          ) : (
            ''
          )}
          {isLoading ? (
            <MovieDetailsInfo />
          ) : (
            <div className="row review-card">
              {reviews &&
                reviews?.map((review) => (
                  <div
                    className="col-sm-12 col-lg-12 col-xl-12"
                    key={review.id}
                  >
                    <div className="review-card-user">
                      <img src={IconUserReview} alt="" />
                      <h3>{review?.user.name}</h3>
                    </div>
                    <div className="review-card-text">
                      <h4>{review?.text}</h4>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default MovieDetails;
