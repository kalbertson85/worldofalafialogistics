export interface EnquiryData {
  name: string;
  email: string;
  phone: string;
  message: string;
  preferredContact: string;
  preferredDate: string;
  location: string;
  quantity: string;
  price?: string;
  itemId?: string;
  itemTitle?: string;
  category?: string;
  totalPrice?: string;
}

export const submitEnquiry = async (data: EnquiryData) => {
  // In a real application, replace this with your actual API endpoint
  const API_URL = process.env.REACT_APP_API_URL || 'https://api.worldofalafialogistics.com';
  
  try {
    const response = await fetch(`${API_URL}/api/enquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        source: 'website',
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to submit enquiry');
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting enquiry:', error);
    throw error;
  }
};
