import React, { useState ,useEffect} from 'react';
import { List ,Button} from 'antd-mobile';
import * as css from './index.module.css'
import voicePng from './录音.png';
import videoPng from './视频.png'
import cameraPng from './拍照.png';
import PhotoPng from './照片.png';
import playPng from './播放.png';
import play1Png from './视频播放.png';
const Item = List.Item;
function Summary(props) {
    const [renderdata, setData] = useState({
        desc: '',
        moviedocument: [],
        camerbitmap: [],
        voicedocument: [],
        photodocument: []
    });
    useEffect(()=>{
        if(window.Summary){
            setData(window.Summary);
          }
    },[])
    const [startAudio, setAudio] = useState(false);
    console.log(startAudio);
    function clickEvent(type) {
        switch (type) {
            case 1:
                HWH5.chooseImage({
                    flag: 2,
                    imagePickerMode: 'All',
                    maxSelectedCount: 12,
                    showOrigin: false,
                    btntxtEN: 'Done',
                    btntxtCN: '完成',
                    cameraFacing: 0,
                    compress: '0.25'
                }).then(data => {
                    console.log(data);
                    setData({
                        ...renderdata,
                        ...{ camerbitmap: renderdata.camerbitmap.concat(data) },
                    })
                }).catch(error => {
                    console.log('访问相册异常', error);
                });
                break;
            case 2:
                HWH5.chooseImage({
                    flag: 1,
                    imagePickerMode: 'All',
                    maxSelectedCount: 12,
                    showOrigin: false,
                    btntxtEN: 'Done',
                    btntxtCN: '完成',
                    cameraFacing: 0,
                    compress: '0.25'
                }).then(data => {
                    console.log(data);
                    setData({
                        ...renderdata,
                        ...{ photodocument: renderdata.photodocument.concat(data) },
                    })
                }).catch(error => {
                    console.log('访问相册异常', error);
                });
                break;
            case 3:
                startAudioFun();
                break;
            case 4:
                HWH5.chooseImage({
                    flag: 3,
                    imagePickerMode: 'All',
                    maxSelectedCount: 12,
                    showOrigin: false,
                    btntxtEN: 'Done',
                    btntxtCN: '完成',
                    cameraFacing: 0,
                    compress: '0.25'
                }).then(data => {
                    console.log(data);
                    setData({
                        ...renderdata,
                        ...{ moviedocument: renderdata.moviedocument.concat(data) },
                    })
                }).catch(error => {
                    console.log('访问相册异常', error);
                });
                break;
        }


    }
    function startAudioFun() {
        setAudio(true);
        HWH5.recordAudio({
            type: 'startTape',
            sampleRate: '8000',
            format: 'mp3',
            encodeBitRate: '8',
            numberOfChannels: '1'
        }).then(data => {

        }).catch(error => {
            console.log('启动录音异常', error);
        });
    }
    function cancalAudio() {
        HWH5.recordAudio({
            type: 'cancelTape',
            sampleRate: '8000',
            format: 'mp3',
            encodeBitRate: '8',
            numberOfChannels: '1'
        }).then(data => {
            setAudio(false);
            console.log(data);
        }).catch(error => {
            console.log('启动录音异常', error);
        });
    }
    function stopAudio() {
        HWH5.recordAudio({
            type: 'endTape',
            sampleRate: '8000',
            format: 'mp3',
            encodeBitRate: '8',
            numberOfChannels: '1'
        }).then(data => {
            setAudio(false);
            console.log(data);
            setData({
                ...renderdata,
                ...{ voicedocument: renderdata.voicedocument.concat(data.filePath) },
            })
        }).catch(error => {
            console.log('启动录音异常', error);
        });
    }
    function handleOk(){
        window.Summary = renderdata;
        window.history.go(-1);
    }
    return <div className={css.app}>
        <List renderHeader={() => ''} className="my-list">
            <Item>
                <textarea className={"weui-textarea " + css.itemtextarea} onChange={(e) => setData({ ...renderdata, ...{ desc: e.target.value } })} value={renderdata.desc} placeholder="请输入希望达成的目标" rows="2"></textarea>
            </Item>
            <Item>
                <div className={css.itemwrap}>
                    {
                        renderdata.camerbitmap.map((e, i) => {
                            return <div key={i} className={css.item_item}>
                                <img className={css.item_img} src={e} />
                            </div>
                        })
                    }
                    <div onClick={() => clickEvent(1)} className={css.item_item}>
                        <img src={cameraPng} alt=""/>
                    </div>
                </div>
                
            </Item>
            <Item>
                <div className={css.itemwrap}>
                    {
                        renderdata.photodocument.map((e, i) => {
                            return <div key={i} className={css.item_item}>
                                <img className={css.item_img} src={e} />
                            </div>
                        })
                    }
                    <div className={css.item_item} onClick={() => clickEvent(2)}>
                        <img src={PhotoPng} alt=""/>
                    </div>
                </div>
                
            </Item>
            <Item>
                <div className={css.itemwrap}>
                    {
                        renderdata.voicedocument.map((e, i) => {
                            return <div key={i} className={css.item_item}>
                                <img src={playPng}/>
                            </div>
                        })
                    }
                    <div className={css.item_item} onClick={() => clickEvent(3)}>
                        <img src={voicePng} alt=""/>
                    </div>
                </div>
                
            </Item>
            <Item>
                <div className={css.itemwrap}>
                    {
                        renderdata.moviedocument.map((e, i) => {
                            return <div key={i} className={css.item_item}>
                                <img src={play1Png}/>
                            </div>
                        })
                    }
                    <div className={css.item_item} onClick={() => clickEvent(4)}>
                        <img src={videoPng} alt=""/>
                        
                    </div>
                </div>
            </Item>
            <Item>
                <Button onClick={()=>handleOk()}  type="primary">确定</Button>
            </Item>
        </List>
        {
            startAudio && <div className="weui-mask" id="mask">
                <div className={"weui-actionsheet " + css.weuiActionsheet} id="actionSheet">
                    <div className="weui-actionsheet__menu">
                        <div className="weui-actionsheet__cell">
                            <div>时长：</div>
                            <div onClick={() => stopAudio()}>完成</div>
                        </div>

                    </div>
                    <div className="weui-actionsheet__action">
                        <div className="weui-actionsheet__cell" id="actionSheetCancel" onClick={() => cancalAudio()}>取消</div>
                    </div>
                </div>
            </div>
        }


    </div>
}

export default Summary