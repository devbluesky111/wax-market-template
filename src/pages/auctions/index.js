import qs from 'qs'
import React from 'react'
import Auctions from '../../components/auctions'

const AuctionsPage = (props) => {
    return <Auctions {...props} />
}

AuctionsPage.getInitialProps = async (ctx) => {
    const paths = ctx.asPath.split('/')

    return qs.parse(paths[1].replace('auctions?', ''))
}

export default AuctionsPage
