import { useEffect, useLayoutEffect, useState } from 'react';
import PicSumImg from '../../models/pick-sum-img';
import PageHeader from '../../components/PageHeader';
import useIntersectionValue from '../../hooks/useIntersectionValue';
import { useFetch } from '../../hooks/useFetch';

export default function InfiniteScrollPage() {
  const [photos, setPhotos] = useState<PicSumImg[]>([]);
  const [page, setPage] = useState(1);

  const { observe, intersecting } = useIntersectionValue();
  const { data, loading, error, pagination } = useFetch(
    `https://picsum.photos/v2/list?page=${page}&limit=10`
  );

  useLayoutEffect(() => {
    if (intersecting && pagination.next) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [intersecting]);

  useEffect(() => {
    const photos = data as PicSumImg[];
    if (photos) {
      setPhotos((prevPhotos) => [...prevPhotos, ...photos]);
    }
  }, [data]);

  return (
    <>
      <PageHeader
        title="Infinite Scroll"
        subTitle="With Custom Hooks. Using useCallBack as Ref"
      />
      <div className="row g-3">
        {photos.map((photo, i) => (
          <div
            key={photo.id}
            className="infinite-loading-item col-md-6 col-lg-4"
          >
            <img
              src={photo.download_url}
              className="img-fluid"
              ref={i === photos.length - 1 ? observe : undefined}
            />
          </div>
        ))}

        {loading &&
          Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="col-md-6 col-lg-4 align-items-stretch">
              <div className="infinite-loading-item alert alert-light d-flex align-items-center justify-content-center">
                <div className="">Loading...</div>
              </div>
            </div>
          ))}

        {error && (
          <div className="col-12">
            <div className="alert alert-danger-subtle">
              Error loading images
            </div>
          </div>
        )}
      </div>
    </>
  );
}
