import React, { useState, useEffect } from 'react';

import arrow from '@assets/img/sidearrow.svg';

const Carousel = (props) => {
    const [imgArr, setImgArr] = useState(undefined);
    const [idx, setIdx] = useState(undefined);
    const [currentImg, setcurrentImg] = useState(undefined);
    const [imgCache, setImgCache] = useState([]);

    const getImgUrl = async () => {
        const response = await fetch(`${process.env.API_URL}/img`,
            {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            });
        if (response.ok) {
            const img = (await response.json()).data;
            setIdx(0);
            setImgArr(img);
            loadingImg(img[0], 0);
        }
    }

    const getImgfile = async (imgurl, index) => {
        const img = await fetch(`${process.env.STATIC_URL}/${imgurl}`)
            .then(res => res.blob())
            .then(imgBlob => imgBlob);

        const cacheObj = { index: index, url: img }
        setImgCache([...imgCache, cacheObj]);
        return img;
    }

    const loadingImg = async (imgurl, index) => {
        const img = imgCache.find(cache => cache.index === index);
        const blob = img === undefined ? await getImgfile(imgurl, index) : img.url;
        const reader = new FileReader();

        reader.onload = () => {
            setcurrentImg(reader.result);
        }
        reader.readAsDataURL(blob);
        props.character(imgurl);
    }

    const handleIdxDecrease = async () => {
        idx !== 0 ? (loadingImg(imgArr[idx - 1], idx - 1), setIdx(idx - 1)) : '';
    }

    const handleIdxIncrease = () => {
        idx !== imgArr.length - 1 ? (loadingImg(imgArr[idx + 1], idx + 1), setIdx(idx + 1)) : '';
    }

    useEffect(() => {
        getImgUrl();
    }, [])

    return (
        <div id='carousel-wrap'>
            <button className='icon-wrap' onClick={handleIdxDecrease}>
                <img className='arrow-icon' src={arrow} />
            </button>
            <img id='avatar' src={currentImg} />
            <button className='icon-wrap' onClick={handleIdxIncrease}>
                <img className='arrow-icon' id='right' src={arrow} />
            </button>
        </div>
    );
}

export default Carousel;