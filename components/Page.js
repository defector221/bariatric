import React from 'react';
import styled from 'styled-components';
const PageView=styled.ScrollView`
display:flex;
margin:5px
`
export default function Page(props) {

 return (<PageView keyboardShouldPersistTaps='always' keyboardDismissMode='on-drag'>{props.children}</PageView>)
}