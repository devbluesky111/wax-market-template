import cn from 'classnames'
import React, { useState } from 'react'
import { getAuctionsById } from '../../api/fetch'
import config from '../../config.json'
import ErrorPage from '../../pages/_error.page'
import AssetDetails from '../asset/AssetDetails'
import AssetImage from '../asset/AssetImage'
import Bids from '../auctions/Bids'
import Page from '../common/layout/Page'
import Header from '../common/util/Header'
import { formatPrice } from '../helpers/Helpers'
import MarketButtons from '../marketbuttons'

/**
 * @type {React.FC<{ auction?: import('../../api/fetch').Auction }>}
 */
export const AuctionComponent = (props) => {
    const [auction, setAuction] = useState(props.auction)

    const [listed, setListed] = useState(false)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [bidPlaced, setBidPlaced] = useState(false)

    if (!auction) return <ErrorPage></ErrorPage>

    const asset = auction.assets[0]

    let description = `by ${asset.collection.name}${
        asset.template_mint ? ' - Mint #' + asset.template_mint : ''
    } - Buy for ${formatPrice(auction)}`

    const data = asset.data

    const image = data.img ? config.ipfs + data.img : ''

    const title = `Check out ${asset.name}`

    const updateAuction = (res) => {
        if (res) {
            setAuction(res.data[0])
        }
        setIsLoading(false)
    }

    const handleBidPlaced = async (bidInfo) => {
        if (bidInfo) {
            if (bidInfo['error']) setError(bidInfo['error'])

            if (bidInfo['bidPlaced']) {
                setIsLoading(true)
                await new Promise((r) => setTimeout(r, 2000))
                getAuctionsById(asset.asset_id).then((res) => updateAuction(res))
                setBidPlaced(true)
            }
        }
    }

    return (
        <Page>
            <Header title={title} description={description} image={image} />
            <div className={cn('container mx-auto pt-10')}>
                {auction.assets.map((asset, i) => (
                    <div key={i} className="grid grid-cols-6 gap-10 h-auto w-full">
                        <div className="col-start-2 col-span-2">
                            <AssetImage backimg={asset.data.backimg} img={asset.data.img} video={asset.data.video} />
                        </div>
                        <div className="col-span-2">
                            <AssetDetails asset={asset} />
                        </div>
                    </div>
                ))}
                <MarketButtons
                    asset={asset}
                    listing={auction}
                    handleBidPlaced={handleBidPlaced}
                    listed={listed}
                    bidPlaced={bidPlaced}
                    setListed={setListed}
                    error={error}
                    setError={setError}
                    setIsLoading={setIsLoading}
                    isLoading={isLoading}
                />
                <Bids bids={auction.bids} />
                <div className="relative mt-20 mb-20 text-center">
                    <div className="m-auto h-1/4 leading-10">
                        <a
                            className="text-primary"
                            href={`https://wax.atomichub.io/market/auction/${auction.auction_id}`}
                        >
                            View on Atomichub
                        </a>
                    </div>
                </div>
            </div>
        </Page>
    )
}

export default AuctionComponent
