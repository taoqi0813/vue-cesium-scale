/**
 * Cesium - https://github.com/AnalyticalGraphicsInc/cesium
 *
 * Copyright 2011-2020 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/AnalyticalGraphicsInc/cesium/blob/master/LICENSE.md for full licensing details.
 */
define(["./when-0488ac89","./Check-78ca6843","./Math-8a4c9da1","./Cartesian2-cc1e6450","./defineProperties-c6a70625","./Transforms-fa4f10bc","./RuntimeError-4d6e0952","./WebGLConstants-66e14a3b","./ComponentDatatype-9252f28f","./GeometryAttribute-3345e440","./GeometryAttributes-3227db5b","./IndexDatatype-8575c917","./IntersectionTests-12255a09","./Plane-466db411","./VertexFormat-7996cb24","./arrayRemoveDuplicates-c6db543d","./ArcType-318ba758","./EllipsoidRhumbLine-9e95354f","./EllipsoidGeodesic-80f12c10","./PolylinePipeline-1e8e81a9","./Color-9b5f0c1e"],function(J,e,j,K,t,Q,r,a,X,Z,$,ee,o,n,y,te,re,i,l,ae,oe){"use strict";var ne=[];function ie(e,t,r,a,o){var n,i=ne;i.length=o;var l=r.red,s=r.green,p=r.blue,c=r.alpha,d=a.red,u=a.green,y=a.blue,m=a.alpha;if(oe.Color.equals(r,a)){for(n=0;n<o;n++)i[n]=oe.Color.clone(r);return i}var f=(d-l)/o,h=(u-s)/o,v=(y-p)/o,C=(m-c)/o;for(n=0;n<o;n++)i[n]=new oe.Color(l+n*f,s+n*h,p+n*v,c+n*C);return i}function m(e){var t=(e=J.defaultValue(e,J.defaultValue.EMPTY_OBJECT)).positions,r=e.colors,a=J.defaultValue(e.width,1),o=J.defaultValue(e.colorsPerVertex,!1);this._positions=t,this._colors=r,this._width=a,this._colorsPerVertex=o,this._vertexFormat=y.VertexFormat.clone(J.defaultValue(e.vertexFormat,y.VertexFormat.DEFAULT)),this._arcType=J.defaultValue(e.arcType,re.ArcType.GEODESIC),this._granularity=J.defaultValue(e.granularity,j.CesiumMath.RADIANS_PER_DEGREE),this._ellipsoid=K.Ellipsoid.clone(J.defaultValue(e.ellipsoid,K.Ellipsoid.WGS84)),this._workerName="createPolylineGeometry";var n=1+t.length*K.Cartesian3.packedLength;n+=J.defined(r)?1+r.length*oe.Color.packedLength:1,this.packedLength=n+K.Ellipsoid.packedLength+y.VertexFormat.packedLength+4}m.pack=function(e,t,r){var a;r=J.defaultValue(r,0);var o=e._positions,n=o.length;for(t[r++]=n,a=0;a<n;++a,r+=K.Cartesian3.packedLength)K.Cartesian3.pack(o[a],t,r);var i=e._colors;for(n=J.defined(i)?i.length:0,t[r++]=n,a=0;a<n;++a,r+=oe.Color.packedLength)oe.Color.pack(i[a],t,r);return K.Ellipsoid.pack(e._ellipsoid,t,r),r+=K.Ellipsoid.packedLength,y.VertexFormat.pack(e._vertexFormat,t,r),r+=y.VertexFormat.packedLength,t[r++]=e._width,t[r++]=e._colorsPerVertex?1:0,t[r++]=e._arcType,t[r]=e._granularity,t};var f=K.Ellipsoid.clone(K.Ellipsoid.UNIT_SPHERE),h=new y.VertexFormat,v={positions:void 0,colors:void 0,ellipsoid:f,vertexFormat:h,width:void 0,colorsPerVertex:void 0,arcType:void 0,granularity:void 0};m.unpack=function(e,t,r){var a;t=J.defaultValue(t,0);var o=e[t++],n=new Array(o);for(a=0;a<o;++a,t+=K.Cartesian3.packedLength)n[a]=K.Cartesian3.unpack(e,t);var i=0<(o=e[t++])?new Array(o):void 0;for(a=0;a<o;++a,t+=oe.Color.packedLength)i[a]=oe.Color.unpack(e,t);var l=K.Ellipsoid.unpack(e,t,f);t+=K.Ellipsoid.packedLength;var s=y.VertexFormat.unpack(e,t,h);t+=y.VertexFormat.packedLength;var p=e[t++],c=1===e[t++],d=e[t++],u=e[t];return J.defined(r)?(r._positions=n,r._colors=i,r._ellipsoid=K.Ellipsoid.clone(l,r._ellipsoid),r._vertexFormat=y.VertexFormat.clone(s,r._vertexFormat),r._width=p,r._colorsPerVertex=c,r._arcType=d,r._granularity=u,r):(v.positions=n,v.colors=i,v.width=p,v.colorsPerVertex=c,v.arcType=d,v.granularity=u,new m(v))};var le=new K.Cartesian3,se=new K.Cartesian3,pe=new K.Cartesian3,ce=new K.Cartesian3;return m.createGeometry=function(e){var t,r,a,o=e._width,n=e._vertexFormat,i=e._colors,l=e._colorsPerVertex,s=e._arcType,p=e._granularity,c=e._ellipsoid,d=te.arrayRemoveDuplicates(e._positions,K.Cartesian3.equalsEpsilon),u=d.length;if(!(u<2||o<=0)){if(s===re.ArcType.GEODESIC||s===re.ArcType.RHUMB){var y,m;m=s===re.ArcType.GEODESIC?(y=j.CesiumMath.chordLength(p,c.maximumRadius),ae.PolylinePipeline.numberOfPoints):(y=p,ae.PolylinePipeline.numberOfPointsRhumbLine);var f=ae.PolylinePipeline.extractHeights(d,c);if(J.defined(i)){var h=1;for(t=0;t<u-1;++t)h+=m(d[t],d[t+1],y);var v=new Array(h),C=0;for(t=0;t<u-1;++t){var g=d[t],_=d[t+1],A=i[t],E=m(g,_,y);if(l&&t<h){var P=ie(0,0,A,i[t+1],E),b=P.length;for(r=0;r<b;++r)v[C++]=P[r]}else for(r=0;r<E;++r)v[C++]=oe.Color.clone(A)}v[C]=oe.Color.clone(i[i.length-1]),i=v,ne.length=0}d=s===re.ArcType.GEODESIC?ae.PolylinePipeline.generateCartesianArc({positions:d,minDistance:y,ellipsoid:c,height:f}):ae.PolylinePipeline.generateCartesianRhumbArc({positions:d,granularity:y,ellipsoid:c,height:f})}var w,T=4*(u=d.length)-4,x=new Float64Array(3*T),k=new Float64Array(3*T),D=new Float64Array(3*T),V=new Float32Array(2*T),L=n.st?new Float32Array(2*T):void 0,F=J.defined(i)?new Uint8Array(4*T):void 0,G=0,O=0,R=0,I=0;for(r=0;r<u;++r){var S,B;0===r?(w=le,K.Cartesian3.subtract(d[0],d[1],w),K.Cartesian3.add(d[0],w,w)):w=d[r-1],K.Cartesian3.clone(w,pe),K.Cartesian3.clone(d[r],se),r===u-1?(w=le,K.Cartesian3.subtract(d[u-1],d[u-2],w),K.Cartesian3.add(d[u-1],w,w)):w=d[r+1],K.Cartesian3.clone(w,ce),J.defined(F)&&(S=0===r||l?i[r]:i[r-1],r!==u-1&&(B=i[r]));var U=r===u-1?2:4;for(a=0===r?2:0;a<U;++a){K.Cartesian3.pack(se,x,G),K.Cartesian3.pack(pe,k,G),K.Cartesian3.pack(ce,D,G),G+=3;var N=a-2<0?-1:1;if(V[O++]=a%2*2-1,V[O++]=N*o,n.st&&(L[R++]=r/(u-1),L[R++]=Math.max(V[O-2],0)),J.defined(F)){var M=a<2?S:B;F[I++]=oe.Color.floatToByte(M.red),F[I++]=oe.Color.floatToByte(M.green),F[I++]=oe.Color.floatToByte(M.blue),F[I++]=oe.Color.floatToByte(M.alpha)}}}var H=new $.GeometryAttributes;H.position=new Z.GeometryAttribute({componentDatatype:X.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:x}),H.prevPosition=new Z.GeometryAttribute({componentDatatype:X.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:k}),H.nextPosition=new Z.GeometryAttribute({componentDatatype:X.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:D}),H.expandAndWidth=new Z.GeometryAttribute({componentDatatype:X.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:V}),n.st&&(H.st=new Z.GeometryAttribute({componentDatatype:X.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:L})),J.defined(F)&&(H.color=new Z.GeometryAttribute({componentDatatype:X.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:4,values:F,normalize:!0}));var W=ee.IndexDatatype.createTypedArray(T,6*u-6),Y=0,q=0,z=u-1;for(r=0;r<z;++r)W[q++]=Y,W[q++]=Y+2,W[q++]=Y+1,W[q++]=Y+1,W[q++]=Y+2,W[q++]=Y+3,Y+=4;return new Z.Geometry({attributes:H,indices:W,primitiveType:Z.PrimitiveType.TRIANGLES,boundingSphere:Q.BoundingSphere.fromPoints(d),geometryType:Z.GeometryType.POLYLINES})}},function(e,t){return J.defined(t)&&(e=m.unpack(e,t)),e._ellipsoid=K.Ellipsoid.clone(e._ellipsoid),m.createGeometry(e)}});
