// services
import * as tokenService from './tokenService'

// models
import { Listing } from '../types/models'

// types
import { ListingFormData } from '../types/forms'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/listings`

async function createListing(formData: ListingFormData): Promise<Listing> {
  try {
    const res = await fetch(BASE_URL, {
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

async function editListing(formData: ListingFormData, listingId: number): Promise<Listing> {
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



export { createListing, getAllListings, editListing, getListing }
