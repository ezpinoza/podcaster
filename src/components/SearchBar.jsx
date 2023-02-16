import { React } from 'react'

import PropTypes from 'prop-types'

export default function SearchBar({
  filterText,
  setFilterText,
  filteredPodcasts,
}) {
  return (
    <div className="searchbar">
      <span>{filteredPodcasts.length}</span>
      <input
        type="text"
        value={filterText}
        placeholder="Filter podcasts..."
        onChange={(e) => setFilterText(e.target.value)}
      />
    </div>
  )
}

SearchBar.propTypes = {
  filterText: PropTypes.string.isRequired,
  setFilterText: PropTypes.func.isRequired,
  filteredPodcasts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.shape({
        number: PropTypes.number,
      }).isRequired,
      title: PropTypes.shape({
        string: PropTypes.string,
      }).isRequired,
      description: PropTypes.shape({
        string: PropTypes.string,
      }),
    })
  ).isRequired,
}
