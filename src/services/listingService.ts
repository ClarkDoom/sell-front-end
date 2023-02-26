// services
import * as tokenService from './tokenService'

// models
import { Listing } from '../types/models'

// types
import { ListingFormData, MarkAsSold } from '../types/forms'



const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/listings`

// 'api/listings/:profileId/create'

async function createListing(formData: ListingFormData, profileId: number): Promise<Listing> {
  try {
    const res = await fetch(`${BASE_URL}/${profileId}/create`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    return await res.json() as Listing
  } catch (error) {
    throw error
  }
}

async function getAllListings(): Promise<Listing[]> {
  try {
    const res = await fetch(BASE_URL, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
    })
    return await res.json() as Listing[]
  } catch (error) {
    throw error
  }
}

async function editListing(formData: ListingFormData | MarkAsSold, listingId: number): Promise<Listing> {
  try {
    const res = await fetch(`${BASE_URL}/${listingId}/edit`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    return await res.json() as Listing
  } catch (error) {
    throw error
  }
}

async function getListing(listingId: number): Promise<Listing> {
  try {
    const res = await fetch(`${BASE_URL}/${listingId}`, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
    })
    return await res.json() as Listing
  } catch (error) {
    throw error
  }
}

async function deleteListing(listingId: number): Promise<void> {
  try {
    await fetch(`${BASE_URL}/${listingId}/delete`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
      },

    })
  } catch (err) {
    throw err
  }
}



export { createListing, getAllListings, editListing, getListing, deleteListing }
