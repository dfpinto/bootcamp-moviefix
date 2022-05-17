import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { requestBackend } from 'util/requests';
import Select from 'react-select';
import { Genre } from 'types/genre';
import './styles.css';

export type MovieFilterData = {
  genre: Genre | null;
};

type Props = {
  onSubmitFilter: (data: MovieFilterData) => void;
};

const MovieFilter = ({ onSubmitFilter }: Props) => {
  const [selectGenres, setSelectGenres] = useState<Genre[]>([]);

  const { handleSubmit, setValue, getValues, control } =
    useForm<MovieFilterData>();

  const handleChangeMovie = (value: Genre) => {
    setValue('genre', value);
    const obj: MovieFilterData = {
      genre: getValues('genre'),
    };
    onSubmitFilter(obj);
  };

  const onSubmit = (formData: MovieFilterData) => {
    onSubmitFilter(formData);
  };

  useEffect(() => {
    requestBackend({
      method: 'GET',
      url: '/genres',
      withCredentials: true,
    }).then((response) => {
      console.log('Genres', response.data);
      setSelectGenres(response.data);
    });
  }, []);

  const customStyles = {
    container: (styles: any) => ({ ...styles, flex: 1 }),
    option: (provided: any, state: any) => ({
      ...provided,
      fontWeight: state.isSelected ? 'bold' : 'normal',
      color: 'white',
      backgroundColor: state.isFocused ? "#aaa" : "#6c6c6c",
      fontSize: 16,
    }),
    singleValue: (provided: any, state: any) => ({
      ...provided,
      color: 'white',
      fontSize: 16,
    }),
  };

  return (
    <div className="base-card movie-filter-container">
      <form onSubmit={handleSubmit(onSubmit)} className="movie-filter-form">
        <div className="movie-filter-genre-container">
          <Controller
            name="genre"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={selectGenres}
                isClearable
                styles={customStyles}
                onChange={(value) => handleChangeMovie(value as Genre)}
                placeholder="Gênero"
                classNamePrefix="movie-filter-select"
                getOptionLabel={(genre) => genre.name}
                getOptionValue={(genre) => String(genre.id)}
              />
            )}
          />
        </div>
      </form>
    </div>
  );
};

export default MovieFilter;
