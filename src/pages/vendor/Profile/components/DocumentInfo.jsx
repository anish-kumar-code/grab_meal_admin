// components/DocumentInfo.jsx
import React from 'react';
import { Form, Input } from 'antd';

const DocumentInfo = ({ vendor, BASE_URL }) => {
    // console.log(vendor)
  return (
    <Form layout="vertical">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item label="PAN Number" name="panNo">
          <Input defaultValue={vendor.panNo} disabled />
        </Form.Item>
        <Form.Item label="GST Number" name="gstNo">
          <Input defaultValue={vendor.gstNo} disabled />
        </Form.Item>
        <Form.Item label="Food License" name="foodLicense">
          <Input defaultValue={vendor.foodLicense} disabled />
        </Form.Item>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div>
          <label className="block mb-1">PAN Image</label>
          <img src={`${BASE_URL}/${vendor.panImage}`} alt="PAN" className="rounded shadow" />
        </div>
        <div>
          <label className="block mb-1">GST Image</label>
          <img src={`${BASE_URL}/${vendor.gstImage}`} alt="GST" className="rounded shadow" />
        </div>
        <div>
          <label className="block mb-1">Food License Image</label>
          <img src={`${BASE_URL}/${vendor.foodImage}`} alt="Food License" className="rounded shadow" />
        </div>
      </div>
    </Form>
  );
};

export default DocumentInfo;
