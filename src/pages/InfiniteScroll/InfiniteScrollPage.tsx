import { useCallback, useEffect, useRef, useState } from 'react';
import PicSumImg from '../../models/pick-sum-img';
import PageHeader from '../../components/PageHeader';
import { parseLinkHeader } from '../../api/parseLinkHeader';

export default function InfiniteScrollPage() {
  const [photos, setPhotos] = useState<PicSumImg[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>();

  const nextPhotoUrlRef = useRef<string | undefined>();

  async function fetchPhotos({
    url,
    signal,
    override = false,
  }: {
    url: string;
    signal: AbortSignal;
    override?: boolean;
  }) {
    setLoading(true);
    try {
      const response = await fetch(url, { signal: signal });
      nextPhotoUrlRef.current = parseLinkHeader(
        response.headers.get('Link') || ''
      ).next;
      const photos = await response.json();
      console.log('fetch page:', url, photos.length);
      if (override) {
        setPhotos(photos);
      } else {
        setPhotos((prevPhotos) => [...prevPhotos, ...photos]);
      }
      setLoading(false);
    } catch (error: Error) {
      if ((error as Error).name !== 'AbortError') {
        setError(error);
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    const abortController = new AbortController();
    fetchPhotos({
      url: 'https://picsum.photos/v2/list?page=1&limit=10',
      signal: abortController.signal,
      override: true,
    });
    return () => {
      abortController.abort();
    };
  }, []);

  const lastImgRef = useCallback((node: Element) => {
    if (node === null) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && nextPhotoUrlRef.current) {
        fetchPhotos({
          url: nextPhotoUrlRef.current,
          signal: new AbortController().signal,
        });
        observer.unobserve(node);
      }
    });
    observer.observe(node);
  }, []);

  return (
    <>
      <PageHeader title="Infinite Scroll" subTitle="Using useCallBack as Ref" />
      <div className="row g-3" style={{ minHeight: '800px' }}>
        {photos.map((photo, i) => (
          <div
            key={photo.id}
            className="col-md-6 col-lg-4"
            style={{ minHeight: '220px' }}
          >
            <img
              src={photo.download_url}
              className="img-fluid"
              ref={i === photos.length - 1 ? lastImgRef : undefined}
            />
          </div>
        ))}

        {loading &&
          Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="col-md-6 col-lg-4 align-items-stretch">
              <div
                className="alert alert-light d-flex align-items-center justify-content-center"
                style={{ minHeight: '220px' }}
              >
                <span>Loading...</span>
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
