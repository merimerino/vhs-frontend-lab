import { useState } from 'react';
import { useRouter } from 'next/router';
const AddVHSForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [duration, setDuration] = useState<number | string>('');
  const [releasedAt, setReleasedAt] = useState<number | string>('');
  const [rentalPrice, setRentalPrice] = useState<number | string>('');
  const [rentalDuration, setRentalDuration] = useState<number | string>('');
  const [quantity, setQuantity] = useState<number | string>('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setThumbnail(e.target.files[0]);
    }
    console.log(thumbnail?.type)
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

    console.log(formData)

    try {
      const response = await fetch('http://localhost:3000/api/vhs', {
        method: 'POST',
        body: formData,
      });
      console.log(response)
    //   if (!response.ok) {
    //     const errorText = await response.text();
    //     throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    //   }

      router.push('/catalogue');
    } catch (error) {
      console.error('Error adding VHS:', error);
    }
  };

  return (
    <div>
      <h1>Add New VHS</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Genre:</label>
          <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />
        </div>
        <div>
          <label>Duration (minutes):</label>
          <input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} required />
        </div>
        <div>
          <label>Released At (year):</label>
          <input type="number" value={releasedAt} onChange={(e) => setReleasedAt(Number(e.target.value))} required />
        </div>
        <div>
          <label>Rental Price:</label>
          <input type="number" value={rentalPrice} onChange={(e) => setRentalPrice(Number(e.target.value))} required />
        </div>
        <div>
          <label>Rental Duration (days):</label>
          <input type="number" value={rentalDuration} onChange={(e) => setRentalDuration(Number(e.target.value))} required />
        </div>
        <div>
          <label>Quantity:</label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} required />
        </div>
        <div>
          <label>Thumbnail:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        <button type="submit">Add VHS</button>
      </form>
    </div>
  );
};

export default AddVHSForm;
