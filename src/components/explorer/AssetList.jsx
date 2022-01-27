import cn from 'classnames'
import React, { useMemo, useState } from 'react'
import { useAssets, useCollections } from '../../api/api_hooks'
import AssetCard from '../assetcard/AssetCard'
import AssetListContent from '../common/layout/Content'
import Filters from '../filters/Filters'
import { getFilters, useQuerystring } from '../helpers/Helpers'
import LoadingIndicator from '../loadingindicator/LoadingIndicator'
import Pagination from '../pagination/Pagination'

/**
 * @type {React.FC}
 */
const AssetList = () => {
    const { data: collections, loading: collectionsLoading } = useCollections()
    const [values] = useQuerystring()
    const [page, setPage] = useState(1)
    const filters = useMemo(() => getFilters(values, collections, 'assets', page), [values, collections, page])

    const { data: assets, loading: assetsLoading } = useAssets(filters)
    const loading = collectionsLoading || assetsLoading

    const pageination = useMemo(() => <Pagination items={assets} page={page} setPage={setPage} />, [assets, page])

    return (
        <AssetListContent>
            <div className={cn('w-full sm:1/3 md:w-1/4 md:ml-4 mx-auto p-0 md:p-5', 'max-w-filter')}>
                <Filters
                    defaultSort="created_desc"
                    sortOptions={[
                        {
                            value: 'created_desc',
                            label: 'Created (Newest)',
                        },
                        {
                            value: 'created_asc',
                            label: 'Created (Oldest)',
                        },
                    ]}
                />
            </div>
            <div className={cn('w-full sm:2/3 md:w-3/4')}>
                {loading ? (
                    <LoadingIndicator />
                ) : (
                    <>
                        {pageination}
                        <div
                            className={cn(
                                'relative w-full mb-24',
                                'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4',
                            )}
                        >
                            {assets
                                ? assets.map((asset, index) => (
                                      <AssetCard key={index} index={index} assets={[asset]} page="assets" />
                                  ))
                                : null}
                        </div>
                        {pageination}
                    </>
                )}
            </div>
        </AssetListContent>
    )
}

export default AssetList
