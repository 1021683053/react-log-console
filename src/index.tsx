import React from 'react';
import classNames from 'classnames/bind';
import Scrollbar from "react-scrollbars-custom";
import styles from './styles.less';

const cx = classNames.bind(styles);

const styleTrackX = {
  borderRadius: 0,
  background: 'rgba(255, 255, 255, 0.5)',
  height: 6,
  width: 'calc(100% - 10px)',
  left: 0
}

const styleTrackY = {
  borderRadius: 0,
  background: 'rgba(255, 255, 255, 0.5)',
  width: 6,
  height: 'calc(100% - 10px)',
  top: 0
}

export default class extends React.Component<any>{

  public static defaultProps = {
    // 自动滚动 当连续打印时，滚动条距离底部多少距离，混动条将会推理自动滚动
    autoCatchHeight: 50,
  }

  public scrollbarRef: any = React.createRef();

  public scrollState : any = null

  public state: any = {
    lines: []
  }

  public componentDidUpdate = ()=>{
    const { autoCatchHeight } = this.props
    const scrollState = this.scrollState
    const scrollBottom = scrollState ? scrollState.contentScrollHeight - (scrollState.scrollTop + scrollState.clientHeight) : 0;
    if( scrollBottom < autoCatchHeight ){
      this.scrollbarRef.scrollToBottom();
    }
  }

  public push = (data: string[] | string )=>{
    const lines = [...this.state.lines];
    if( Array.isArray(data as string[]) ){
      lines.splice(-1, 0, )
      this.setState({ lines: lines.concat(data) })
      return
    }
    lines.push(data as string);
    this.setState({ lines });
  }

  public handleScroll = (ScrollState: any)=>{
    this.scrollState = ScrollState;
  }

  public render(){
    const { lines } = this.state
    return (
      <div className={cx('container')}>
        <Scrollbar
          ref={(inst:any)=> this.scrollbarRef = inst}
          style={{ position: 'unset' }}
          onScroll={this.handleScroll}
          wrapperProps={{
            renderer: (props: any) => {
              const { elementRef, style, ...restProps } = props;
              return <div {...restProps} ref={elementRef} style={{...style, bottom: 6, right: 6 }} />;
            }
          }}
          contentProps={{
            renderer: (props: any) => {
              const { elementRef, style, ...restProps } = props;
              return <div {...restProps} ref={elementRef} style={{...style }} />;
            }
          }}
          trackXProps={{
            renderer: (props: any) => {
              const { elementRef, style, ...restProps } = props;
              return <div {...restProps} ref={elementRef} style={{...style, ...styleTrackX}} />;
            }
          }}
          trackYProps={{
            renderer: (props: any) => {
              const { elementRef, style, ...restProps } = props;
              return <div {...restProps} ref={elementRef} style={{...style, ...styleTrackY}} />;
            }
          }}
          thumbXProps={{
            renderer: (props: any) => {
              const { elementRef, style, ...restProps } = props;
              return <div {...restProps} ref={elementRef} style={{...style, borderRadius: 0}} />;
            }
          }}
          thumbYProps={{
            renderer: (props: any) => {
              const { elementRef, style, ...restProps } = props;
              return <div {...restProps} ref={elementRef} style={{...style, borderRadius: 0}} />;
            }
          }}
        >
          {
            lines.map((line: string, index: number)=>{
              return (
                <div className={cx('line-container')} key={index}>
                  <span className={cx('line-number')}>{index}</span>
                  <p className={cx('line-content')}>
                    {line}
                  </p>
                </div>
              )
            })
          }
        </Scrollbar>
      </div>
    )
  }
}
