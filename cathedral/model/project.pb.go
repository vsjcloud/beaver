// Code generated by protoc-gen-go. DO NOT EDIT.
// source: project.proto

package model

import (
	fmt "fmt"
	proto "github.com/golang/protobuf/proto"
	timestamp "github.com/golang/protobuf/ptypes/timestamp"
	math "math"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.ProtoPackageIsVersion3 // please upgrade the proto package

type ProjectInfo struct {
	Name                 string   `protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"`
	Value                string   `protobuf:"bytes,2,opt,name=value,proto3" json:"value,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *ProjectInfo) Reset()         { *m = ProjectInfo{} }
func (m *ProjectInfo) String() string { return proto.CompactTextString(m) }
func (*ProjectInfo) ProtoMessage()    {}
func (*ProjectInfo) Descriptor() ([]byte, []int) {
	return fileDescriptor_8340e6318dfdfac2, []int{0}
}

func (m *ProjectInfo) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_ProjectInfo.Unmarshal(m, b)
}
func (m *ProjectInfo) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_ProjectInfo.Marshal(b, m, deterministic)
}
func (m *ProjectInfo) XXX_Merge(src proto.Message) {
	xxx_messageInfo_ProjectInfo.Merge(m, src)
}
func (m *ProjectInfo) XXX_Size() int {
	return xxx_messageInfo_ProjectInfo.Size(m)
}
func (m *ProjectInfo) XXX_DiscardUnknown() {
	xxx_messageInfo_ProjectInfo.DiscardUnknown(m)
}

var xxx_messageInfo_ProjectInfo proto.InternalMessageInfo

func (m *ProjectInfo) GetName() string {
	if m != nil {
		return m.Name
	}
	return ""
}

func (m *ProjectInfo) GetValue() string {
	if m != nil {
		return m.Value
	}
	return ""
}

type ProjectPhoto struct {
	PhotoID              string   `protobuf:"bytes,1,opt,name=photoID,proto3" json:"photoID,omitempty"`
	Description          string   `protobuf:"bytes,2,opt,name=description,proto3" json:"description,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *ProjectPhoto) Reset()         { *m = ProjectPhoto{} }
func (m *ProjectPhoto) String() string { return proto.CompactTextString(m) }
func (*ProjectPhoto) ProtoMessage()    {}
func (*ProjectPhoto) Descriptor() ([]byte, []int) {
	return fileDescriptor_8340e6318dfdfac2, []int{1}
}

func (m *ProjectPhoto) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_ProjectPhoto.Unmarshal(m, b)
}
func (m *ProjectPhoto) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_ProjectPhoto.Marshal(b, m, deterministic)
}
func (m *ProjectPhoto) XXX_Merge(src proto.Message) {
	xxx_messageInfo_ProjectPhoto.Merge(m, src)
}
func (m *ProjectPhoto) XXX_Size() int {
	return xxx_messageInfo_ProjectPhoto.Size(m)
}
func (m *ProjectPhoto) XXX_DiscardUnknown() {
	xxx_messageInfo_ProjectPhoto.DiscardUnknown(m)
}

var xxx_messageInfo_ProjectPhoto proto.InternalMessageInfo

func (m *ProjectPhoto) GetPhotoID() string {
	if m != nil {
		return m.PhotoID
	}
	return ""
}

func (m *ProjectPhoto) GetDescription() string {
	if m != nil {
		return m.Description
	}
	return ""
}

type Project struct {
	Name                 string               `protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"`
	Description          string               `protobuf:"bytes,2,opt,name=description,proto3" json:"description,omitempty"`
	Details              []*ProjectInfo       `protobuf:"bytes,3,rep,name=details,proto3" json:"details,omitempty"`
	StartDate            *timestamp.Timestamp `protobuf:"bytes,4,opt,name=startDate,proto3" json:"startDate,omitempty"`
	FinishDate           *timestamp.Timestamp `protobuf:"bytes,5,opt,name=finishDate,proto3" json:"finishDate,omitempty"`
	FeaturePhotoID       *ProjectPhoto        `protobuf:"bytes,6,opt,name=featurePhotoID,proto3" json:"featurePhotoID,omitempty"`
	AlbumPhotoIDs        []*ProjectPhoto      `protobuf:"bytes,7,rep,name=albumPhotoIDs,proto3" json:"albumPhotoIDs,omitempty"`
	XXX_NoUnkeyedLiteral struct{}             `json:"-"`
	XXX_unrecognized     []byte               `json:"-"`
	XXX_sizecache        int32                `json:"-"`
}

func (m *Project) Reset()         { *m = Project{} }
func (m *Project) String() string { return proto.CompactTextString(m) }
func (*Project) ProtoMessage()    {}
func (*Project) Descriptor() ([]byte, []int) {
	return fileDescriptor_8340e6318dfdfac2, []int{2}
}

func (m *Project) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_Project.Unmarshal(m, b)
}
func (m *Project) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_Project.Marshal(b, m, deterministic)
}
func (m *Project) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Project.Merge(m, src)
}
func (m *Project) XXX_Size() int {
	return xxx_messageInfo_Project.Size(m)
}
func (m *Project) XXX_DiscardUnknown() {
	xxx_messageInfo_Project.DiscardUnknown(m)
}

var xxx_messageInfo_Project proto.InternalMessageInfo

func (m *Project) GetName() string {
	if m != nil {
		return m.Name
	}
	return ""
}

func (m *Project) GetDescription() string {
	if m != nil {
		return m.Description
	}
	return ""
}

func (m *Project) GetDetails() []*ProjectInfo {
	if m != nil {
		return m.Details
	}
	return nil
}

func (m *Project) GetStartDate() *timestamp.Timestamp {
	if m != nil {
		return m.StartDate
	}
	return nil
}

func (m *Project) GetFinishDate() *timestamp.Timestamp {
	if m != nil {
		return m.FinishDate
	}
	return nil
}

func (m *Project) GetFeaturePhotoID() *ProjectPhoto {
	if m != nil {
		return m.FeaturePhotoID
	}
	return nil
}

func (m *Project) GetAlbumPhotoIDs() []*ProjectPhoto {
	if m != nil {
		return m.AlbumPhotoIDs
	}
	return nil
}

func init() {
	proto.RegisterType((*ProjectInfo)(nil), "model.ProjectInfo")
	proto.RegisterType((*ProjectPhoto)(nil), "model.ProjectPhoto")
	proto.RegisterType((*Project)(nil), "model.Project")
}

func init() { proto.RegisterFile("project.proto", fileDescriptor_8340e6318dfdfac2) }

var fileDescriptor_8340e6318dfdfac2 = []byte{
	// 286 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x84, 0x90, 0xbf, 0x6e, 0x83, 0x30,
	0x10, 0xc6, 0x95, 0xbf, 0x28, 0x47, 0xd3, 0xe1, 0xda, 0xc1, 0xca, 0x52, 0xc4, 0xc4, 0x50, 0x39,
	0x52, 0x3a, 0xf4, 0xdf, 0x9a, 0x25, 0x9d, 0x10, 0xea, 0x0b, 0x98, 0x70, 0x24, 0xae, 0x00, 0x23,
	0x6c, 0xfa, 0xb2, 0x7d, 0x99, 0x2a, 0xc6, 0xa8, 0xa4, 0x8a, 0x94, 0xed, 0xee, 0xfc, 0xfd, 0xce,
	0xdf, 0x7d, 0xb0, 0xac, 0x1b, 0xf5, 0x45, 0x7b, 0xc3, 0xeb, 0x46, 0x19, 0x85, 0xb3, 0x52, 0x65,
	0x54, 0xac, 0x1e, 0x0e, 0x4a, 0x1d, 0x0a, 0x5a, 0xdb, 0x61, 0xda, 0xe6, 0x6b, 0x23, 0x4b, 0xd2,
	0x46, 0x94, 0x75, 0xa7, 0x0b, 0x9f, 0xc1, 0x8f, 0x3b, 0x70, 0x57, 0xe5, 0x0a, 0x11, 0xa6, 0x95,
	0x28, 0x89, 0x8d, 0x82, 0x51, 0xb4, 0x48, 0x6c, 0x8d, 0xf7, 0x30, 0xfb, 0x16, 0x45, 0x4b, 0x6c,
	0x6c, 0x87, 0x5d, 0x13, 0x7e, 0xc0, 0x8d, 0x03, 0xe3, 0xe3, 0xe9, 0x43, 0x06, 0x5e, 0x7d, 0x2a,
	0x76, 0x5b, 0x07, 0xf7, 0x2d, 0x06, 0xe0, 0x67, 0xa4, 0xf7, 0x8d, 0xac, 0x8d, 0x54, 0x95, 0xdb,
	0x32, 0x1c, 0x85, 0x3f, 0x63, 0xf0, 0xdc, 0xb2, 0x8b, 0x0e, 0xae, 0x6e, 0xc0, 0x47, 0xf0, 0x32,
	0x32, 0x42, 0x16, 0x9a, 0x4d, 0x82, 0x49, 0xe4, 0x6f, 0x90, 0xdb, 0x00, 0xf8, 0xe0, 0xb8, 0xa4,
	0x97, 0xe0, 0x0b, 0x2c, 0xb4, 0x11, 0x8d, 0xd9, 0x0a, 0x43, 0x6c, 0x1a, 0x8c, 0x22, 0x7f, 0xb3,
	0xe2, 0x5d, 0x52, 0xbc, 0x4f, 0x8a, 0x7f, 0xf6, 0x49, 0x25, 0x7f, 0x62, 0x7c, 0x03, 0xc8, 0x65,
	0x25, 0xf5, 0xd1, 0xa2, 0xb3, 0xab, 0xe8, 0x40, 0x8d, 0xef, 0x70, 0x9b, 0x93, 0x30, 0x6d, 0x43,
	0xb1, 0x0b, 0x6a, 0x6e, 0xf9, 0xbb, 0x73, 0xab, 0xf6, 0x31, 0xf9, 0x27, 0xc5, 0x57, 0x58, 0x8a,
	0x22, 0x6d, 0x4b, 0xd7, 0x6b, 0xe6, 0xd9, 0x33, 0x2f, 0xb2, 0xe7, 0xca, 0x74, 0x6e, 0x7d, 0x3d,
	0xfd, 0x06, 0x00, 0x00, 0xff, 0xff, 0x54, 0xa2, 0xec, 0x67, 0x22, 0x02, 0x00, 0x00,
}
