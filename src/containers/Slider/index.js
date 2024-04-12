import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  const totalImages = byDateDesc ? byDateDesc.length : 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (byDateDesc) {
        setIndex(prevIndex => prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0);
      }
    }, 5000);
    
    return () => {
      clearTimeout(timer);
    };
  }, [index, totalImages]);

  
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={`${event.id}-${idx}`}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" className="SliderCard_image" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
            {byDateDesc.map((_, dotIdx) => (
              <span
              // eslint-disable-next-line react/no-array-index-key
              key={`${event.id}-${idx}-${dotIdx}`}
              className={`dot ${index === dotIdx ? "dot_selected" : ""}`}
                  />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
