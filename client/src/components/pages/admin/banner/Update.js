import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../../axios'

const AdminUpdateBanner = ({ data, close, setData }) => {
    const [name, setName] = useState(data.name)
    const [show, setShow] = useState(data.show)
    const [link, setLink] = useState(data.link)
    const [localLink, setLocalLink] = useState(data.localLink)
    const [info, setInfo] = useState(data.info)
    const [image, setImage] = useState(null)
    const [colorName, setColorName] = useState(data.colorTitle)
    const [colorInfo, setColorInfo] = useState(data.colorInfo)
    const [changeImage, setChangeImage] = useState(false)
    const [btnUpdate, setBtnUpdate] = useState(true)
    const [localImg, setLocalImg] = useState(data.localImg)
    const [linkImg, setLinkImg] = useState(data.img)

    const handleImage = e => setImage(e.target.files[0])
    const handleName = e => setName(e.target.value)
    const handleShow = e => setShow(e.target.value)
    const handleUpload = () => {
        if (name.trim().length === 0)
            toast.error('Enter album name!')
        else if (link.trim().length === 0)
            toast.error('enter link!')
        else if (!image && changeImage && localImg === 1)
            toast.error('Upload album image!')
        else if (localImg === 0 && linkImg.trim().length === 0)
            toast.error('Enter link album image!')
        else {
            let formData = new FormData()
            if (changeImage) {
                if (localImg === 1)
                    formData.append('file', image, image.name)
                else
                    formData.append('img', linkImg)
            }
            formData.append('locallink', localLink)
            formData.append('link', link)
            formData.append('colortitle', colorName)
            formData.append('colorinfo', colorInfo)
            formData.append('info', info)
            formData.append('localimg', localImg)
            formData.append('id', data.id)
            formData.append('changeImage', changeImage)
            formData.append('name', name)
            formData.append('show', show)
            setBtnUpdate(false)
            const loading = toast.loading('Wait...')
            api.put('api/admin/banner/', formData).then(res => {
                if (res.data.success) {
                    toast.dismiss(loading)
                    setBtnUpdate(true)
                    toast.success(res.data.message)
                    setData(prev => (
                        {
                            ...prev,
                            data: prev.data.map(ele => (
                                ele.id === data.id
                                    ? ({
                                        ...ele,
                                        name,
                                        info,
                                        link,
                                        colorInfo,
                                        colorTitle: res.data.data.colorTitle,
                                        img: res.data.data.img,
                                        show: res.data.data.show,
                                        localImg: res.data.data.localImg,
                                        localLink: res.data.data.localLink,
                                        
                                    })
                                    : (
                                        ele
                                    ))
                            )
                        }
                    ))
                    close()
                } else {
                    toast.dismiss(loading)
                    setBtnUpdate(true)
                    toast.error(res.data.message)
                }
            })

        }
    }

    return (
        <>
            <div className='card manage-update-song'>
                <div className='card-header'>
                    <div className='d-flex justify-content-between align-item-center'>
                        <div>
                            <h6>Edit Banner | Admin</h6>
                        </div>
                        <div
                            onClick={close}
                            className='btn btn-secondary btn-sm'>Close</div>
                    </div>
                </div>
                <div className='card-body'>
                    <div className='upload-container'>
                        <div className='form-group'>
                            <label htmlFor='name'>Name:</label>
                            <input
                                onChange={handleName}
                                type='text'
                                className='form-control'
                                id='name'
                                placeholder='Name Song'
                                value={name}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='namecolor' className='form-control-label'>Name color:</label>
                            <input 
                                className='form-control' 
                                type='color' 
                                value={colorName}
                                id='namecolor'
                                onChange={e => setColorName(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='info'>Info:</label>
                            <textarea
                                onChange={e => setInfo(e.target.value)}
                                type='text'
                                className='form-control'
                                id='info'
                                placeholder='info'
                                value={info}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='infocolor' className='form-control-label'>Info color:</label>
                            <input 
                                className='form-control' 
                                type='color' 
                                value={colorInfo}
                                id='infocolor'
                                onChange={e => setColorInfo(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='link'>Link:</label>
                            <input
                                onChange={e => setLink(e.target.value)}
                                type='text'
                                className='form-control'
                                id='link'
                                placeholder='link'
                                value={link}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='locallink'>
                                This link is:
                            </label>
                            <select
                                onChange={e => setLocalLink(e.target.value)}
                                className='form-control'
                                defaultValue={localLink}
                                id='locallink'>
                                <option value='0'>External link</option>
                                <option value='1'>Internal Link</option>
                            </select>
                        </div>

                        <div className='form-group'>
                            <label htmlFor='show'>
                                The banner out now?
                            </label>
                            <select
                                onChange={handleShow}
                                className='form-control'
                                defaultValue={show}
                                id='show'>
                                <option value='1'>Yes</option>
                                <option value='0'>No</option>
                            </select>
                        </div>

                        <div className='form-group'>
                            <div className='d-flex justify-content-between align-items-end'>
                                <div>
                                    <label htmlFor='album'>Image:  </label>
                                </div>
                                <div className='d-flex justify-content-end'>
                                    {changeImage
                                        ? (
                                            <>
                                                <div
                                                    onClick={() => localImg === 1 ? setLocalImg(0) : setLocalImg(1)}
                                                    className='btn btn-sm btn-outline-success mx-1'>{localImg === 1 ? 'Use link' : 'Upload file'}</div>
                                                <div
                                                    onClick={() => setChangeImage(prev => !prev)}
                                                    className='btn btn-sm btn-outline-primary'>Cancel change</div>
                                            </>
                                        )
                                        : (
                                            <div
                                                onClick={() => setChangeImage(prev => !prev)}
                                                className='btn btn-sm btn-outline-primary'>Change</div>
                                        )}
                                </div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                {changeImage
                                    ? (
                                        <>
                                            {localImg === 1
                                                ? (
                                                    <input
                                                        id='image'
                                                        className='form-control'
                                                        onChange={handleImage}
                                                        type='file'
                                                        accept='image/png, image/jpeg, image/jpg'
                                                    />
                                                )
                                                : (
                                                    <input
                                                        id='image'
                                                        type='text'
                                                        className='form-control'
                                                        onChange={e => setLinkImg(e.target.value)}
                                                        value={linkImg}
                                                        placeholder='Input link image'
                                                    />
                                                )}


                                        </>
                                    )
                                    : (
                                        <img
                                            src={data.localImg === 1
                                                ? process.env.REACT_APP_API_SRC_BANNER_IMG + data.img
                                                : data.img}
                                            className='avatar me-3 img-song'
                                            alt={data.name}
                                        />
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='card-footer'>
                    <div className='d-flex justify-content-end'>
                        <button
                            onClick={handleUpload}
                            disabled={!btnUpdate}
                            className='btn btn-info'>Edit</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminUpdateBanner;