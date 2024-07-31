import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const FormContainer = styled.div`
  padding: 2rem;
  width: 75vw;
  margin: 0 auto;
  color: var(--primary-default);
  background-color: var(--surface-s1);
`;

const Title = styled.div`
  color: var(--primary-variant);
  padding-bottom: 1rem;
  font-size: 20px;
  font-weight: bolder;
`;

const FormField = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--primary-text);
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--on-surface-nLv1);
  border-radius: 4px;
  background-color: var(--surface-s1);
  color: var(--primary-text);

  &:focus {
    border: 1px solid var(--surface-s2);
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--on-surface-nLv1);
  border-radius: 4px;
  background-color: var(--surface-s1);
  color: var(--primary-text);
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: var(--surface-s1);
  background-color: var(--secondary-default);

  &:hover {
    background-color: var(--primary-variant);
  }
`;

const Error = styled.p`
  color: red;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
`;

const FullWidthField = styled(FormField)`
  grid-column: span 2;
`;

const ThumbnailContainer = styled.div`
  width: 18rem;
  min-height: 20rem;
  border: 1px solid var(--on-surface-nLv1);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: var(--on-surface-nLv1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface VHSFormProps {
  isEdit?: boolean;
  initialData?: any;
}

const VHSForm: React.FC<VHSFormProps> = ({ isEdit = false, initialData }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [duration, setDuration] = useState<number | string>('');
  const [releasedAt, setReleasedAt] = useState<number | string>('');
  const [rentalPrice, setRentalPrice] = useState<number | string>('');
  const [rentalDuration, setRentalDuration] = useState<number | string>('');
  const [quantity, setQuantity] = useState<number | string>('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [currentThumbnail, setCurrentThumbnail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (isEdit && id) {
      const fetchVHSData = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/vhs/${id}`);
          const data = await response.json();
          setTitle(data.title);
          setDescription(data.description);
          setGenre(data.genre);
          setDuration(data.duration);
          setReleasedAt(data.releasedAt);
          setRentalPrice(data.rentalPrice);
          setRentalDuration(data.rentalDuration);
          setQuantity(data.quantity);
          setCurrentThumbnail(data.thumbnail ? `http://localhost:3000/${data.thumbnail}` : null);
        } catch (error) {
          setError('Failed to fetch VHS data');
        }
      };

      fetchVHSData();
    } else if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setGenre(initialData.genre);
      setDuration(initialData.duration);
      setReleasedAt(initialData.releasedAt);
      setRentalPrice(initialData.rentalPrice);
      setRentalDuration(initialData.rentalDuration);
      setQuantity(initialData.quantity);
      setCurrentThumbnail(initialData.thumbnail ? `http://localhost:3000/${initialData.thumbnail}` : null);
    }
  }, [id, initialData, isEdit]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('genre', genre);
    formData.append('duration', String(duration));
    formData.append('releasedAt', String(releasedAt));
    formData.append('rentalPrice', String(rentalPrice));
    formData.append('rentalDuration', String(rentalDuration));
    formData.append('quantity', String(quantity));
    
    if (thumbnail) {
      formData.append('thumbnail', thumbnail);
    }
    console.log('FormData Entries:', Array.from(formData.entries()));

    try {


      const response = await fetch(`http://localhost:3000/api/vhs${isEdit ? `/${id}` : ''}`, {
        method: isEdit ? 'PATCH' : 'POST',
        body: formData,
      });

      if (response.ok) {
        router.push('/catalogue');
      } else {
        const errorText = await response.text();
        setError(`Failed to save VHS: ${errorText}`);
      }
    } catch (error) {
      setError('Error saving VHS');
    }
  };

  return (
    <FormContainer>
      <Title>{isEdit ? 'Edit VHS' : 'Add new VHS'}</Title>
      <form onSubmit={handleSubmit}>
        <GridContainer>
          <div>
            <FormField>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                required
              />
            </FormField>
            <FormField>
              <Label htmlFor="genre">Genre</Label>
              <Input
                id="genre"
                name="genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                type="text"
                required
              />
            </FormField>
            <FormField>
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                name="duration"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                type="number"
                required
              />
            </FormField>
            <FormField>
              <Label htmlFor="releasedAt">Released At (Year)</Label>
              <Input
                id="releasedAt"
                name="releasedAt"
                value={releasedAt}
                onChange={(e) => setReleasedAt(Number(e.target.value))}
                type="number"
                required
              />
            </FormField>
            <FormField>
              <Label htmlFor="rentalPrice">Rental Price ($)</Label>
              <Input
                id="rentalPrice"
                name="rentalPrice"
                value={rentalPrice}
                onChange={(e) => setRentalPrice(Number(e.target.value))}
                type="number"
                step="0.01"
                required
              />
            </FormField>
            <FormField>
              <Label htmlFor="rentalDuration">Rental Duration (days)</Label>
              <Input
                id="rentalDuration"
                name="rentalDuration"
                value={rentalDuration}
                onChange={(e) => setRentalDuration(Number(e.target.value))}
                type="number"
                required
              />
            </FormField>
            <FormField>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                name="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                type="number"
                required
              />
            </FormField>
          </div>
          <RightColumn>
            <FormField>
              <Label htmlFor="thumbnail">Thumbnail Upload</Label>
              <ThumbnailContainer>
                {thumbnailPreview ? (
                  <img src={thumbnailPreview} alt="Thumbnail Preview" />
                ) : currentThumbnail ? (
                  <img src={currentThumbnail} alt="Current Thumbnail" />
                ) : (
                  <p>No Image</p>
                )}
              </ThumbnailContainer>
              <Input
                id="thumbnail"
                name="thumbnail"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </FormField>
          </RightColumn>
          <FullWidthField>
            <Label htmlFor="description">Description</Label>
            <TextArea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
            />
          </FullWidthField>
        </GridContainer>
        {error && <Error>{error}</Error>}
        <Button type="submit">{isEdit ? 'Save Changes' : 'Add VHS'}</Button>
      </form>
    </FormContainer>
  );
};

export default VHSForm;
